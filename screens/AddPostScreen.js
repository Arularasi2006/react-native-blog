import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { COLORS } from "../utils/colors";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import { apiClient } from "../utils/api";

export default function AddPostScreen() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit() {
    
    try {
      const response = await apiClient.post("/posts", { title, content });
      console.log("Post created:", response.data);

      //clear form
      setContent("");
      setTitle("");
      Alert.alert("Success", "Post created successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to submit post");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create New Post</Text>
      
      <View style={styles.formContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter post title"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor={COLORS.textSecondary}
        />

        <Text style={styles.label}>Content</Text>
        <TextInput
          style={[styles.input, styles.contentInput]}
          placeholder="Write your post content here"
          value={content}
          onChangeText={setContent}
          multiline
          placeholderTextColor={COLORS.textSecondary}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  contentInput: {
    minHeight: 150,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});