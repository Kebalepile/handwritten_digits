class ArithmeticQuiz {
    constructor(equations, updateQuizState) {
      this.equations = equations;
      this.askedQuestions = new Set();
      this.unaskedQuestions = Object.keys(equations).flatMap(
        group => equations[group]
      );
      this.currentQuestion = null;
      this.remainingAttempts = 3;
      this.updateQuizState = updateQuizState; // Callback function to update React component state
    }
  
    getRandomEquation() {
      if (this.unaskedQuestions.length === 0) {
        console.log("No more questions available.");
        this.updateQuizState("No more questions available.");
        return null;
      }
  
      const randomIndex = Math.floor(
        Math.random() * this.unaskedQuestions.length
      );
      this.currentQuestion = this.unaskedQuestions[randomIndex];
      this.unaskedQuestions.splice(randomIndex, 1); // Remove the question from unasked list
      return this.currentQuestion[0];
    }
  
    getCurrentQuestion() {
      if (!this.currentQuestion) {
        this.getRandomEquation();
      }
      return this.currentQuestion ? this.currentQuestion[0] : "";
    }
  
    validateAnswer(userAnswer) {
      const correctAnswer = this.currentQuestion[1];
      return userAnswer === correctAnswer;
    }
  
    checkAnswer(userAnswer) {
      if (!this.currentQuestion) {
        return false;
      }
  
      if (userAnswer !== "") {
        let isValid = this.validateAnswer(userAnswer);
  
        if (!isValid && this.remainingAttempts > 1) {
          console.log("Incorrect answer. Please try again.");
          this.updateQuizState("Incorrect answer. Please try again.");
          this.remainingAttempts--;
          return false;
        } else if (!isValid) {
          console.log(
            `Incorrect answer. The correct answer is ${this.currentQuestion[1]}.`
          );
          this.updateQuizState(
            `Incorrect answer. The correct answer is ${this.currentQuestion[1]}. Try a different question.`
          );
          this.unaskedQuestions.push(this.currentQuestion); // Push question back to unasked list
          this.remainingAttempts = 3; // Reset remaining attempts for next question
          this.currentQuestion = null; // Reset current question
          return false;
        } else {
          this.askedQuestions.add(this.currentQuestion[0]); // Track asked questions
          console.log("Correct answer!");
          this.updateQuizState("Correct answer! Here's the next question:");
          this.remainingAttempts = 3; // Reset remaining attempts for next question
          this.currentQuestion = null; // Reset current question
          return true;
        }
      }
    }
  }
  
  export default ArithmeticQuiz;
  