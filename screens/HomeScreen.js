import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { COLORS } from "../utils/colors";
import { useEffect, useState } from "react";
import { apiClient } from "../utils/api";

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalCount: 0,
    limit: 5,
  });
  const [loading, setLoading] = useState(false);

  async function fetchPostsWithPagination(page = 1) {
    try {
      setLoading(true);
      const response = await apiClient.get(`/posts?page=${page}&limit=${pagination.limit}`);
      console.log("Posts fetched:", response.data);
      
      if (response.data.data && response.data.data.posts) {
        setPosts(response.data.data.posts);
        setPagination({
          currentPage: page,
          totalCount: response.data.data.pagination?.totalCount || 0,
          limit: pagination.limit,
        });
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPostsWithPagination(1);
  }, []);

  const handleNextPage = () => {
    const nextPage = pagination.currentPage + 1;
    if (nextPage * pagination.limit <= pagination.totalCount) {
      fetchPostsWithPagination(nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (pagination.currentPage > 1) {
      fetchPostsWithPagination(pagination.currentPage - 1);
    }
  };

  const renderPostItem = ({ item }) => (
    <View style={styles.postCard}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postContent} numberOfLines={3}>{item.content}</Text>
      <Text style={styles.postMeta}>ID: {item.id}</Text>
    </View>
  );

  if (loading && posts.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Blog Posts</Text>
      
      {posts.length > 0 ? (
        <>
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderPostItem}
            scrollEnabled={false}
            contentContainerStyle={styles.listContainer}
          />

          <View style={styles.paginationContainer}>
            <TouchableOpacity
              style={[styles.paginationButton, pagination.currentPage === 1 && styles.disabledButton]}
              onPress={handlePreviousPage}
              disabled={pagination.currentPage === 1}
            >
              <Text style={styles.paginationButtonText}>Previous</Text>
            </TouchableOpacity>

            <Text style={styles.pageIndicator}>
              Page {pagination.currentPage} of {Math.ceil(pagination.totalCount / pagination.limit)}
            </Text>

            <TouchableOpacity
              style={[styles.paginationButton, (pagination.currentPage * pagination.limit >= pagination.totalCount) && styles.disabledButton]}
              onPress={handleNextPage}
              disabled={pagination.currentPage * pagination.limit >= pagination.totalCount}
            >
              <Text style={styles.paginationButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={styles.body}>No posts available.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  postCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: 8,
    lineHeight: 20,
  },
  postMeta: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  paginationButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: "#ccc",
    opacity: 0.6,
  },
  paginationButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  pageIndicator: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary,
  },
  body: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: 20,
  },
});