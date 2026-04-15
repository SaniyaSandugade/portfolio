import { useState } from "react";
import API from "../services/api";
import "../styles/form.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      return alert("All fields required");
    }

    setLoading(true);

    try {
      await API.post("/contact", form);
      alert("Message sent successfully ✅");
      setForm({ name: "", email: "", message: "" });
    } catch {
      alert("Error sending message ❌");
    }

    setLoading(false);
  };

  return (
    <div className="contact-container">
      <h2>Contact Me</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <textarea
          placeholder="Message"
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
        />

        {/* CAPTCHA */}
        <label>
          <input type="checkbox" required /> I'm not a robot
        </label>

        <button type="submit">
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}

export default Contact;