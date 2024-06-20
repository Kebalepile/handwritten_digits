export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Specify manual chunks based on your code structure
          if (id.includes("node_modules")) {
            return "vendor";
          }
        }
      }
    }
  }
};
