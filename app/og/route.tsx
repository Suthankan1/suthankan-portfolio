import { ImageResponse } from "next/og";

export const runtime = "edge";

const size = {
  width: 1200,
  height: 630,
};

const colors = {
  background: "#0D0D0D",
  surface: "#1A1A1A",
  text: "#F0F0F0",
  muted: "#B0B0B0",
  accent: "#8B85FF",
  secondary: "#B9FF66",
  border: "#2A2A2A",
};

type OgType = "blog" | "project" | "travel" | "default";

function clampText(value: string | null, fallback: string, maxLength: number): string {
  const text = value?.trim() || fallback;
  return text.length > maxLength ? `${text.slice(0, maxLength - 1)}…` : text;
}

function getType(value: string | null): OgType {
  if (value === "blog" || value === "project" || value === "travel" || value === "default") {
    return value;
  }

  return "default";
}

function Tag({ children, tone = "primary" }: { children: string; tone?: "primary" | "secondary" }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        border: `1px solid ${tone === "secondary" ? colors.secondary : colors.accent}`,
        borderRadius: 999,
        color: tone === "secondary" ? colors.secondary : colors.text,
        background: tone === "secondary" ? "rgba(185,255,102,0.12)" : "rgba(139,133,255,0.16)",
        padding: "10px 18px",
        fontSize: 24,
        fontWeight: 700,
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </div>
  );
}

function Shell({ children, type }: { children: React.ReactNode; type: OgType }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: colors.background,
        color: colors.text,
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: 18,
          background: `linear-gradient(90deg, ${colors.accent}, ${colors.secondary})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -150,
          top: -210,
          width: 520,
          height: 520,
          borderRadius: 260,
          background: "rgba(139,133,255,0.18)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -120,
          bottom: -170,
          width: 410,
          height: 410,
          borderRadius: 205,
          background: "rgba(185,255,102,0.12)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 42,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          border: `1px solid ${colors.border}`,
          borderRadius: 34,
          background: "rgba(26,26,26,0.82)",
          padding: "48px 56px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                width: 44,
                height: 44,
                borderRadius: 22,
                background: `linear-gradient(135deg, ${colors.accent}, ${colors.secondary})`,
              }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.04em" }}>Suthankan</div>
              <div style={{ fontSize: 18, color: colors.muted }}>Full-Stack Developer</div>
            </div>
          </div>
          <Tag tone={type === "travel" ? "secondary" : "primary"}>
            {type === "default" ? "Portfolio" : type.charAt(0).toUpperCase() + type.slice(1)}
          </Tag>
        </div>
        {children}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: colors.muted,
            fontSize: 22,
          }}
        >
          <div>Premium editorial portfolio</div>
          <div>suthankan.dev</div>
        </div>
      </div>
    </div>
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = getType(searchParams.get("type"));
  const title = clampText(searchParams.get("title"), "Suthankan", type === "default" ? 72 : 86);
  const description = clampText(
    searchParams.get("description"),
    "Full-stack development, technical writing, and travel stories.",
    150,
  );
  const category = clampText(searchParams.get("category"), type === "blog" ? "Field Notes" : "Featured", 32);
  const stack = searchParams
    .get("stack")
    ?.split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 5);

  return new ImageResponse(
    (
      <Shell type={type}>
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          {type === "blog" ? (
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <Tag>{category}</Tag>
              <div style={{ fontSize: 26, color: colors.muted }}>By Suthankan</div>
            </div>
          ) : null}

          <div
            style={{
              display: "flex",
              maxWidth: 940,
              fontSize: type === "default" ? 94 : 82,
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: "-0.07em",
            }}
          >
            {title}
          </div>

          {type === "project" && stack && stack.length > 0 ? (
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", maxWidth: 820 }}>
              {stack.map((item) => (
                <Tag key={item} tone="secondary">
                  {item}
                </Tag>
              ))}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                maxWidth: 820,
                color: colors.muted,
                fontSize: 32,
                lineHeight: 1.28,
                letterSpacing: "-0.02em",
              }}
            >
              {type === "default" ? "Suthankan Portfolio" : description}
            </div>
          )}

          {type === "project" ? (
            <div
              style={{
                display: "flex",
                maxWidth: 820,
                color: colors.muted,
                fontSize: 30,
                lineHeight: 1.22,
                letterSpacing: "-0.02em",
              }}
            >
              {description}
            </div>
          ) : null}
        </div>
      </Shell>
    ),
    size,
  );
}
