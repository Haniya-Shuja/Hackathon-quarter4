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
        <h1 style={heroTitle}>🤖 Physical AI & Humanoid Robotics Textbook 🚀</h1>
        <p style={heroSubtitle}>
          💡 Master Advanced AI for Next-Generation Intelligent Machines
        </p>

        <div style={{ marginTop: "50px", textAlign: "center" }}>
          <Link
            className="button button--primary button--lg"
            to="/docs/introduction/intro"
          >
            📚 Start Reading Now
          </Link>
        </div>
      </header>

      {/* ABOUT SECTION */}
      <section style={aboutSection}>
        <h2 style={sectionTitle}>📖 What This Textbook Covers</h2>
        <p style={sectionSubtitle}>
          🎯 A complete AI-native engineering curriculum designed for physical AI, humanoid robots,
          embodied intelligence, ROS 2 programming, digital twin simulations, and Vision-Language-Action
          (VLA) systems. Each module builds your robotics superpowers step by step. ⚡
        </p>
      </section>

      {/* MODULE CARDS */}
      <section style={moduleSection}>
        <h2 style={sectionTitle}>🎓 Explore All Modules</h2>

        <div style={gridContainer}>
          {/* MODULE 1 */}
          <div style={cardStyle}>
            <h3 style={cardTitle}>⚙️ Module 1: ROS 2 Foundations</h3>
            <p style={cardText}>
              Learn ROS 2 — the nervous system of modern robots. Build nodes, topics,
              services, actions, publishers, subscribers, QoS, and real robot workflows.
            </p>
            <div style={{ textAlign: "center" }}>
              <Link className="button button--primary" to="/docs/ros2-foundations/module-1-ros2">
                🚀 Open Module
              </Link>
            </div>
          </div>

          {/* MODULE 2 */}
          <div style={cardStyle}>
            <h3 style={cardTitle}>🌐 Module 2: Simulation & Digital Twins</h3>
            <p style={cardText}>
              Master simulation systems: Gazebo, Unity Robotics, Isaac Sim, and digital
              twin workflows for training and testing robots safely.
            </p>
            <div style={{ textAlign: "center" }}>
              <Link className="button button--primary" to="/docs/simulation/module-2-simulation">
                🎮 Open Module
              </Link>
            </div>
          </div>

          {/* MODULE 3 */}
          <div style={cardStyle}>
            <h3 style={cardTitle}>🔧 Module 3: Hardware Foundations</h3>
            <p style={cardText}>
              Motors, actuators, torque control, IMUs, sensors, microcontrollers,
              embedded systems — everything real humanoids need.
            </p>
            <div style={{ textAlign: "center" }}>
              <Link className="button button--primary" to="/docs/hardware-basics/module-3-hardware">
                ⚡ Open Module
              </Link>
            </div>
          </div>

          {/* MODULE 4 */}
          <div style={cardStyle}>
            <h3 style={cardTitle}>🧠 Module 4: VLA — Vision, Language, Action</h3>
            <p style={cardText}>
              Learn the most advanced robotics architecture: perception models,
              LLM-driven command systems, action planners, and embodied AI agents.
            </p>
            <div style={{ textAlign: "center" }}>
              <Link className="button button--primary" to="/docs/vla-systems/module-4-vla-foundations">
                🤖 Open Module
              </Link>
            </div>
          </div>

          {/* MODULE 5 */}
          <div style={cardStyle}>
            <h3 style={cardTitle}>🎯 Module 5: Advanced AI & Motion Control</h3>
            <p style={cardText}>
              Reinforcement learning, motion planning, MPC, trajectory optimization,
              and how robots think and move intelligently.
            </p>
            <div style={{ textAlign: "center" }}>
              <Link className="button button--primary" to="/docs/advanced-ai-control/module-5-advanced-ai">
                🚁 Open Module
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
<section style={featureSection}>
  <h2 style={sectionTitle}>✨ What Makes This Textbook Unique</h2>

  <div style={gridContainer}>
    <div style={{ ...featureBox, textAlign: "center" }}>
      <h3 style={{ fontSize: "24px", marginBottom: "15px", fontWeight: "800" }}>🎯 Modern AI-Centered Engineering</h3>
      <p style={{ fontSize: "17px", lineHeight: "1.7" }}>
        Designed around today's robotics standards—AI agents, VLA systems,
        real-time decision making, and intelligent robotic workflows.
      </p>
    </div>

    <div style={{ ...featureBox, textAlign: "center" }}>
      <h3 style={{ fontSize: "24px", marginBottom: "15px", fontWeight: "800" }}>🛠️ Learn by Building</h3>
      <p style={{ fontSize: "17px", lineHeight: "1.7" }}>
        Every chapter includes hands-on activities, coding exercises,
        robot simulations, and real engineering practice.
      </p>
    </div>

    <div style={{ ...featureBox, textAlign: "center" }}>
      <h3 style={{ fontSize: "24px", marginBottom: "15px", fontWeight: "800" }}>🏆 Aligned with Industry Standards</h3>
      <p style={{ fontSize: "17px", lineHeight: "1.7" }}>
        Based on real techniques used by leading robotics companies and
        humanoid platforms worldwide.
      </p>
    </div>
  </div>
</section>

      

      {/* CTA SECTION */}
      <section style={ctaSection}>
        <h2 style={ctaTitle}>🎓 Begin Your Robotics Journey Today</h2>
        <p style={ctaSubtitle}>
          🚀 The future belongs to physical AI, embodied intelligence, and humanoid robotics.
          Start mastering it today and become a robotics expert! 🌟
        </p>

        <div style={{ textAlign: "center" }}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/introduction/intro"
            style={{
              background: "white",
              color: "#1e40af",
              border: "3px solid white",
              padding: "18px 52px",
              fontSize: "1.15rem",
              fontWeight: "800",
              borderRadius: "16px",
              boxShadow: "0 12px 30px rgba(0, 0, 0, 0.25)",
              transition: "all 0.3s ease",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            📖 Start Reading Now
          </Link>
        </div>
      </section>
    </Layout>
  );
}

/* ======================
   MODERN UNIFIED STYLES
====================== */

/* HERO SECTION */
const heroSection = {
  padding: "140px 20px 100px",
  textAlign: "center",
  background: "linear-gradient(135deg, #1e40af 0%, #0891b2 50%, #06b6d4 100%)",
  color: "white",
  position: "relative",
  overflow: "hidden",
  boxShadow: "0 8px 24px rgba(30, 64, 175, 0.3)",
};

const heroTitle = {
  fontSize: "3.5rem",
  fontWeight: "800",
  marginBottom: "24px",
  letterSpacing: "-0.02em",
  lineHeight: "1.1",
  textShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
};

const heroSubtitle = {
  fontSize: "1.35rem",
  maxWidth: "700px",
  margin: "0 auto",
  lineHeight: "1.6",
  opacity: "0.95",
  fontWeight: "400",
};

/* ABOUT SECTION */
const aboutSection = {
  padding: "80px 20px",
  maxWidth: "900px",
  margin: "0 auto",
  background: "white",
};

/* SECTION TITLES */
const sectionTitle = {
  fontSize: "2.75rem",
  marginBottom: "28px",
  textAlign: "center",
  color: "#1e40af",
  fontWeight: "800",
  letterSpacing: "-0.02em",
  textTransform: "capitalize",
};

const sectionSubtitle = {
  fontSize: "1.2rem",
  textAlign: "center",
  lineHeight: "1.9",
  color: "#475569",
  maxWidth: "850px",
  margin: "0 auto",
  fontWeight: "500",
};

/* MODULE CARDS SECTION */
const moduleSection = {
  padding: "80px 20px",
  background: "linear-gradient(180deg, #fafafa 0%, #f3f4f6 100%)",
};

const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "32px",
  maxWidth: "1200px",
  margin: "40px auto 0",
};

/* MODULE CARDS */
const cardStyle = {
  background: "white",
  padding: "40px 32px",
  borderRadius: "20px",
  boxShadow: "0 8px 16px -2px rgba(30, 64, 175, 0.15), 0 4px 8px -2px rgba(8, 145, 178, 0.1)",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  border: "3px solid transparent",
  cursor: "pointer",
  position: "relative",
  overflow: "hidden",
  textAlign: "center",
};

const cardTitle = {
  fontSize: "1.5rem",
  fontWeight: "800",
  marginBottom: "20px",
  color: "#1e40af",
  textAlign: "center",
};

const cardText = {
  fontSize: "1.05rem",
  color: "#64748b",
  marginBottom: "28px",
  lineHeight: "1.8",
  textAlign: "center",
};

const cardBtn = {
  display: "inline-block",
  textDecoration: "none",
  background: "linear-gradient(135deg, #1e40af 0%, #0891b2 100%)",
  padding: "14px 28px",
  color: "white",
  borderRadius: "12px",
  fontSize: "1rem",
  fontWeight: "700",
  transition: "all 0.3s ease",
  boxShadow: "0 6px 12px -1px rgba(30, 64, 175, 0.35)",
  textAlign: "center",
};

/* FEATURES SECTION */
const featureSection = {
  padding: "90px 20px",
  background: "linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)",
};

const featureBox = {
  padding: "48px 40px",
  background: "white",
  borderRadius: "20px",
  textAlign: "center",
  border: "3px solid rgba(30, 64, 175, 0.12)",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 6px 12px -2px rgba(30, 64, 175, 0.1)",
};

/* CTA SECTION */
const ctaSection = {
  padding: "120px 20px",
  background: "linear-gradient(135deg, #1e40af 0%, #0891b2 50%, #06b6d4 100%)",
  color: "white",
  textAlign: "center",
  position: "relative",
  boxShadow: "0 -4px 12px rgba(30, 64, 175, 0.2)",
};

const ctaTitle = {
  fontSize: "3rem",
  marginBottom: "28px",
  fontWeight: "900",
  letterSpacing: "-0.02em",
  textShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
  textAlign: "center",
};

const ctaSubtitle = {
  fontSize: "1.35rem",
  marginBottom: "45px",
  color: "rgba(255, 255, 255, 0.97)",
  maxWidth: "750px",
  margin: "0 auto 45px",
  lineHeight: "1.8",
  fontWeight: "500",
  textAlign: "center",
};
