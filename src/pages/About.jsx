import "../css/aboutPage.css"
function About() {
    return (
      <>
        <section className="about-section">
          <h2>Our Journey</h2>
          <div className="team-members">
            <img
              src="public/1549462685858.jpeg"
              alt="Ahmed Belabdia"
              className="team-member-image"
            />
            <img
              src="public/1576186419164.jpeg"
              alt="Fiona Hulse"
              className="team-member-image"
            />
          </div>
          <p>
            We’re <strong>Ahmed Belabdia</strong> and <strong>Fiona Hulse</strong>,
            the creators behind Flashwords, a project born out of our shared
            passion for languages and web development. We met during our time at a
            web development bootcamp, where we discovered that combining
            technology with language learning could help make the process more
            engaging and efficient.
          </p>
          <p>
            As we learned web development, we realized many language apps lacked
            effective methods for reinforcing vocabulary. So, we set out to build
            an app that emphasizes simplicity, usability, and fun—all through the
            power of flashcards. With Flashwords, we hope to help learners master
            languages at their own pace.
          </p>
        </section>
  
        <section className="about-section">
          <h2>What We Offer</h2>
          <p>
            Flashwords is designed to make language learning easier and more
            enjoyable. Our app allows you to create customizable flashcards to
            help you memorize new words and phrases. Whether you're starting with
            the basics or looking to level up your skills, our app adapts to your
            needs and helps you track your progress.
          </p>
          <p>
            With regular reviews and active recall, you’ll make steady progress in
            your language journey. The app is simple to use, and we’re constantly
            working on new features and improvements based on user feedback.
          </p>
        </section>
  
        <section className="about-section">
          <h2>Why Flashcards?</h2>
          <p>
            Flashcards are a well-known, effective method for active recall, which
            helps with long-term retention. By reviewing words and phrases
            consistently, you’ll build your vocabulary faster and with more
            accuracy. Flashwords helps you make language learning part of your
            daily routine, in a fun and flexible way.
          </p>
        </section>
  
        <section className="about-section">
          <h2>Connect with Us</h2>
          <p>
            We’d love to hear your thoughts! If you have any questions, feedback,
            or suggestions, feel free to reach out. Your feedback is what helps us
            continue improving and creating the best language learning tool
            possible.
          </p>
          <p>Thank you for choosing Flashwords, and happy learning!</p>
        </section>
      </>
    );
  }
  
  export default About;
  