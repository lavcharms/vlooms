"use client";

export default function ComingSoon() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .a1 { animation: fadeUp 0.8s ease 0.0s both; }
        .a2 { animation: fadeUp 0.8s ease 0.15s both; }
        .a3 { animation: fadeUp 0.8s ease 0.30s both; }
        .a4 { animation: fadeUp 0.8s ease 0.45s both; }
        .a5 { animation: fadeUp 0.8s ease 0.60s both; }
        .a6 { animation: fadeUp 0.8s ease 0.75s both; }
        .wa-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: #25D366; color: white;
          padding: 14px 32px; border-radius: 50px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px; font-weight: 600;
          text-decoration: none;
          box-shadow: 0 4px 20px rgba(37,211,102,0.35);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .wa-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(37,211,102,0.45);
        }
        .call-link {
          color: #b8895a; font-weight: 600;
          text-decoration: none; border-bottom: 1px solid #b8895a;
          padding-bottom: 1px; transition: opacity 0.2s;
        }
        .call-link:hover { opacity: 0.7; }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "#f7f2ea",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}>

        {/* Background blobs */}
        <div style={{
          position: "absolute", top: -80, right: -80,
          width: 340, height: 340, borderRadius: "50%",
          background: "rgba(184,137,90,0.10)", pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute", bottom: -120, left: -80,
          width: 400, height: 400, borderRadius: "50%",
          background: "rgba(184,137,90,0.07)", pointerEvents: "none"
        }} />

        {/* Content */}
        <div style={{
          position: "relative", zIndex: 1,
          maxWidth: 520, width: "100%",
          textAlign: "center",
          display: "flex", flexDirection: "column",
          alignItems: "center",
        }}>

          {/* Pill badge */}
          <div className="a1" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            border: "1.5px solid #c9a97a",
            padding: "6px 18px", borderRadius: 50,
            marginBottom: 32,
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%",
              background: "#b8895a", display: "inline-block"
            }} />
            <span style={{
              fontSize: 11, letterSpacing: 2.5,
              color: "#b8895a", fontWeight: 600,
              textTransform: "uppercase"
            }}>Website Coming Soon</span>
          </div>

          {/* Logo */}
          <div className="a2">
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(40px, 10vw, 64px)",
              fontWeight: 700, letterSpacing: 4,
              color: "#1a1a1a", lineHeight: 1,
            }}>
              VLOOMS<span style={{ color: "#b8895a" }}>®</span>
            </div>
            <div style={{
              fontSize: 11, letterSpacing: 3,
              color: "#aaa", textTransform: "uppercase",
              marginTop: 8, fontWeight: 500,
            }}>
              Vedanta Home Interior &nbsp;·&nbsp; Est. 1976
            </div>
          </div>

          {/* Divider */}
          <div className="a3" style={{
            width: 40, height: 1.5,
            background: "#b8895a",
            margin: "28px auto",
            borderRadius: 2,
          }} />

          {/* Tagline */}
          <div className="a3" style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(18px, 4vw, 24px)",
            fontStyle: "italic", color: "#3a3a3a",
            marginBottom: 20, lineHeight: 1.4,
          }}>
            "Weaving Dreams, Crafting Elegance"
          </div>

          {/* Description */}
          <p className="a4" style={{
            fontSize: 15, color: "#888",
            lineHeight: 1.75, maxWidth: 400,
            marginBottom: 36,
          }}>
            Jaipur's trusted wholesaler &amp; importer of premium furnishing fabrics.
            Our new website is on its way — until then, reach us directly on WhatsApp.
          </p>

          {/* WhatsApp button */}
          <div className="a5">
            <a
              className="wa-btn"
              href="https://wa.me/917222805555?text=Hi, I'm interested in fabrics from VLOOMS. Please share your catalog and wholesale pricing."
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp: 98290 10380
            </a>
          </div>

          {/* Secondary call link */}
          <div className="a6" style={{ marginTop: 20, fontSize: 13, color: "#aaa" }}>
            or call us at&nbsp;
            <a className="call-link" href="tel:+919829010380">+91-9829010380</a>
          </div>

          {/* Location */}
          <div className="a6" style={{
            marginTop: 40, fontSize: 12, color: "#ccc",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <span>📍</span>
            <span>87, Tagore Nagar, Ajmer Road, Jaipur – 302021</span>
          </div>

        </div>
      </div>
    </>
  );
}