import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

export default function Home() {
  return (
    <Layout
      title="Physical AI & Humanoid Robotics Textbook"
      description="Complete AI-Native textbook for mastering robotics, humanoids, ROS2, VLA systems, and digital twins."
    >
      {/* HERO SECTION */}
      <header style={heroSection}>
        <h1 style={heroTitle}>Physical AI & Humanoid Robotics Textbook</h1>
        <p style={heroSubtitle}>
          Advanced AI for next-generation intelligent machines.
        </p>

        <div style={{ marginTop: "40px" }}>
         <Link
  className="button button--primary button--lg"
  to="/docs/introduction/intro"
  style={{
    background: "#731ce4ff",      // your color
    color: "white",             // text color
    border: "none",
  }}
>
  Start Reading →
</Link>

        </div>
      </header>

      {/* ABOUT SECTION */}
      <section style={aboutSection}>
        <h2 style={sectionTitle}>What This Textbook Covers</h2>
        <p style={sectionSubtitle}>
          This is a complete AI-native engineering curriculum designed for physical AI, humanoid robots,
          embodied intelligence, ROS 2 programming, digital twin simulations, and Vision-Language-Action
          (VLA) systems. Each module builds your robotics superpowers step by step.
        </p>
      </section>

      {/* MODULE CARDS */}
      <section style={moduleSection}>
        <h2 style={sectionTitle}>Explore All Modules</h2>

        <div style={gridContainer}>
          {/* MODULE 1 */}
          <div style={cardStyle}>
            <h3 style={cardTitle}>Module 1: ROS 2 Foundations</h3>
            <p style={cardText}>
              Learn ROS 2 — the nervous system of modern robots. Build nodes, topics,
              services, actions, publishers, subscribers, QoS, and real robot workflows.
            </p>
            <Link style={cardBtn} to="/docs/ros2-foundations/module-1-ros2">
              Open Module →
            </Link>
          </div>

          {/* MODULE 2 */}
          <div style={cardStyle}>
            <h3 style={cardTitle}>Module 2: Simulation & Digital Twins</h3>
            <p style={cardText}>
              Master simulation systems: Gazebo, Unity Robotics, Isaac Sim, and digital
              twin workflows for training and testing robots safely.
            </p>
            <Link style={cardBtn} to="/docs/simulation/module-2-simulation">
              Open Module →
            </Link>
          </div>

          {/* MODULE 3 */}
          <div style={cardStyle}>
            <h3 style={cardTitle}>Module 3: Hardware Foundations</h3>
            <p style={cardText}>
              Motors, actuators, torque control, IMUs, sensors, microcontrollers,
              embedded systems — everything real humanoids need.
            </p>
            <Link style={cardBtn} to="/docs/hardware-basics/module-3-hardware">
              Open Module →
            </Link>
          </div>

          {/* MODULE 4 */}
          <div style={cardStyle}>
            <h3 style={cardTitle}>Module 4: VLA — Vision, Language, Action</h3>
            <p style={cardText}>
              Learn the most advanced robotics architecture: perception models,
              LLM-driven command systems, action planners, and embodied AI agents.
            </p>
            <Link style={cardBtn} to="/docs/vla-systems/module-4-vla-foundations">
              Open Module →
            </Link>
          </div>

          {/* MODULE 5 */}
          <div style={cardStyle}>
            <h3 style={cardTitle}>Module 5: Advanced AI & Motion Control</h3>
            <p style={cardText}>
              Reinforcement learning, motion planning, MPC, trajectory optimization,
              and how robots think and move intelligently.
            </p>
            <Link style={cardBtn} to="/docs/advanced-ai-control/module-5-advanced-ai">
              Open Module →
            </Link>
          </div>

         

          
        </div>
      </section>

      {/* FEATURES SECTION */}
<section style={featureSection}>
  <h2 style={sectionTitle}>What Makes This Textbook Unique</h2>

  <div style={gridContainer}>
    <div style={{ ...featureBox, textAlign: "center" }}>
      <h3 style={{ fontSize: "22px", marginBottom: "10px" }}>Modern AI-Centered Engineering</h3>
      <p style={{ fontSize: "16px", lineHeight: "1.6" }}>
        Designed around today’s robotics standards—AI agents, VLA systems,
        real-time decision making, and intelligent robotic workflows.
      </p>
    </div>

    <div style={{ ...featureBox, textAlign: "center" }}>
      <h3 style={{ fontSize: "22px", marginBottom: "10px" }}>Learn by Building</h3>
      <p style={{ fontSize: "16px", lineHeight: "1.6" }}>
        Every chapter includes hands-on activities, coding exercises,
        robot simulations, and real engineering practice.
      </p>
    </div>

    <div style={{ ...featureBox, textAlign: "center" }}>
      <h3 style={{ fontSize: "22px", marginBottom: "10px" }}>Aligned with Industry Standards</h3>
      <p style={{ fontSize: "16px", lineHeight: "1.6" }}>
        Based on real techniques used by leading robotics companies and
        humanoid platforms worldwide.
      </p>
    </div>
  </div>
</section>

      

      {/* CTA SECTION */}
      <section style={ctaSection}>
        <h2 style={ctaTitle}>Begin Your Robotics Journey</h2>
        <p style={ctaSubtitle}>
          The future belongs to physical AI, embodied intelligence, and humanoid robotics.
          Start mastering it today.
        </p>

        <Link
  className="button button--primary button--lg"
  to="/docs/introduction/intro"
  style={{
    background: "#8a4bdb",      // your color
    color: "white",             // text color
    border: "none",
  }}
>
  Start Reading →
</Link>

      </section>
    </Layout>
  );
}

/* ======================
        STYLES
====================== */

/* HERO */
const heroSection = {
  padding: "60px 20px",
  textAlign: "center",
  background: "linear-gradient(135deg, #9673c4ff, #8a4bdbff)",
  color: "white",
};

const heroTitle = {
  fontSize: "42px",
  fontWeight: "bold",
  marginBottom: "20px",
};

const heroSubtitle = {
  fontSize: "18px",
  maxWidth: "850px",
  margin: "0 auto",
  lineHeight: "1.6",
};

/* ABOUT */
const aboutSection = {
  padding: "50px 20px",
  maxWidth: "1000px",
  margin: "0 auto",
};

/* GENERAL TITLES */
const sectionTitle = {
  fontSize: "28px",
  marginBottom: "20px",
  textAlign: "center",
  color: "#1a1a1a",
};

const sectionSubtitle = {
  fontSize: "18px",
  textAlign: "center",
  lineHeight: "1.7",
  color: "#444",
};

/* MODULE GRID */
const moduleSection = {
  padding: "50px 20px",
  background: "#f9fafc",
};

const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  maxWidth: "1200px",
  margin: "0 auto",
};

/* CARD */
const cardStyle = {
  background: "white",
  padding: "22px",
  borderRadius: "12px",
 boxShadow: "0 4px 14px rgba(150, 115, 196, 0.35), 0 6px 18px rgba(138, 75, 219, 0.28)"

};

const cardTitle = {
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "10px",
};

const cardText = {
  fontSize: "15px",
  color: "#555",
  marginBottom: "20px",
  lineHeight: "1.5",
};

const cardBtn = {
  textDecoration: "none",
  background: "#a200ffff",
  padding: "10px 16px",
  color: "white",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "bold",
};

/* FEATURES */
const featureSection = {
  padding: "60px 20px",
  background: "white",
};

const featureBox = {
  padding: "22px",
  background: "#f5f7fa",
  borderRadius: "10px",
  textAlign: "left",
};

/* CTA */
const ctaSection = {
  padding: "80px 20px",
  background: "#cba4ebff",
  color: "white",
  textAlign: "center",
};

const ctaTitle = {
  fontSize: "32px",
  marginBottom: "20px",
};

const ctaSubtitle = {
  fontSize: "18px",
  marginBottom: "30px",
  color: "#ffffffff",
};
