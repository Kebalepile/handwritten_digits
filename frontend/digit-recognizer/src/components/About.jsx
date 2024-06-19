import React, { useState } from 'react';

const About = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openDialog}>About</button>
      {isOpen && (
        <dialog open onClose={closeDialog} className="dialog-content">
          <article>
            <h3>About Our Number Learning Game</h3>
            <p>Welcome to our interactive number learning game designed especially for children aged 4 to 10! Our innovative web app combines the excitement of a game with the educational value of practicing handwriting and arithmetic, making learning fun and engaging for young minds.</p>

            <h4>What We Offer</h4>

            <ul>
              <li><strong>Interactive Learning</strong>: Our app features a virtual canvas where children can write numbers with their fingers or a stylus. The app then uses advanced machine learning models trained on the MNIST dataset to predict the handwritten digits. This immediate feedback helps children improve their number writing skills in a fun and interactive way.</li>

              <li><strong>Engaging Quizzes</strong>: We incorporate simple arithmetic quizzes, such as "5 - 4 = ?", to make learning numbers even more enjoyable. These quizzes are designed to be straightforward, ensuring that the answers always fall within the 0-9 range, perfect for young learners.</li>

              <li><strong>Encouraging Improvement</strong>: To motivate children to improve their handwriting, our app turns incorrect predictions into a game. If a digit is not recognized correctly, children are encouraged to try again until the prediction matches their intended number. This not only helps them practice their writing but also builds perseverance and attention to detail.</li>

              <li><strong>Fun and Educational</strong>: By combining handwriting practice with arithmetic quizzes, our app helps children enhance their numerical understanding and fine motor skills. It’s a perfect blend of education and entertainment that keeps children engaged and motivated to learn.</li>

              <li><strong>Child-Friendly Interface</strong>: Our user-friendly and colorful interface is designed with young users in mind, ensuring that children can navigate and use the app with ease. Parents can rest assured that their children are learning in a safe and supportive environment.</li>
            </ul>

            <p><strong>Join the Fun:</strong> We invite you to explore our number learning game and see how it can benefit your child's educational journey. Whether they are just starting to learn numbers or looking to improve their handwriting and arithmetic skills, our app provides a fun, interactive, and rewarding experience.</p>

            <p>Start playing today and watch your child’s confidence and skills grow as they master the world of numbers!</p>

            <button onClick={closeDialog}>Close</button>
          </article>
        </dialog>
      )}
    </div>
  );
};

export default About;
