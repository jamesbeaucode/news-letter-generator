// re_XMQTCAUK_Q1KA9CEcNvRuaPqrppQoYJFn

import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Row,
  Column,
  Img,
  Text,
  Heading,
  Button,
  Hr,
  Link,
  Preview,
} from "react-email";
import * as React from "react";
import {
  emptyData,
  sampleData,
  type NewsletterFormData,
} from "../src/stores/newsLetterStore";
import { CiFacebook, CiInstagram, CiYoutube } from "react-icons/ci";

// ── Brand tokens ──────────────────────────────────────────────────────────────
const c = {
  red: "#E63027",
  ink: "#141414",
  body: "#3a3a3a",
  bg: "#ffffff",
  band: "#171717",
  bandSoft: "#d7d4d0",
  panel: "#f4f2ef",
  emailBg: "#d4d2ce",
};

const font = "'Helvetica Neue', Helvetica, Arial, sans-serif";

const LOGO =
  "https://www.image2url.com/r2/default/images/1780923702289-7a0fc625-dbde-4960-a99e-eb3f7dfe6f2e.png";

const val = (value: string | null | undefined, fallback = "") =>
  value ?? fallback;
const link = (value: string | null | undefined) => val(value, "#");

const articleColumnStyles = [
  { width: "33%", paddingRight: 14, verticalAlign: "top" as const },
  {
    width: "33%",
    paddingLeft: 8,
    paddingRight: 8,
    verticalAlign: "top" as const,
  },
  { width: "33%", paddingLeft: 14, verticalAlign: "top" as const },
];

type EmailProps = {
  data?: NewsletterFormData;
};

// ── Shared components ─────────────────────────────────────────────────────────
const SOCIAL_ICON_SIZE = 30;
const socialIconColor = "#ffffff";

function SocialLink({
  href,
  Icon,
  last = false,
}: {
  href: string;
  Icon: React.ComponentType<{ size?: number; color?: string }>;
  last?: boolean;
}) {
  return (
    <Link
      href={href}
      style={{
        display: "inline-block",
        textDecoration: "none",
        marginRight: last ? 0 : 10,
        verticalAlign: "middle",
        fontSize: 0,
      }}
    >
      <Icon size={SOCIAL_ICON_SIZE} color={socialIconColor} />
    </Link>
  );
}

// Eyebrow label (replaces CSS ::before line with a unicode dash)
function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <Text
      style={{
        fontFamily: font,
        fontSize: 12,
        fontWeight: 800,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: light ? "#ff6a62" : c.red,
        margin: "0 0 14px",
        lineHeight: "1",
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: 22,
          height: 2,
          backgroundColor: light ? c.red : c.red,
          verticalAlign: "middle",
          marginRight: 8,
        }}
      />
      {children}
    </Text>
  );
}

export default function Email({ data = sampleData }: EmailProps) {
  const content = data ?? emptyData;

  return (
    <Html lang="en">
      <Head />
      <Preview>
        {val(content.heroTitle, "Ascend Coaching — The Newsletter, Issue 01")}
      </Preview>
      <Body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: c.emailBg,
          fontFamily: font,
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <Container
          style={{
            maxWidth: 700,
            margin: "32px auto",
            backgroundColor: c.bg,
          }}
        >
          {/* ── HERO ─────────────────────────────────────────────────────── */}
          <Section style={{ padding: 0 }}>
            <Row>
              <Column
                style={{
                  backgroundImage: `url(${val(content.heroImage)})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center 30%",
                  backgroundColor: "#4f5a63",
                  padding: 0,
                }}
              >
                {/* Nav bar */}
                <table
                  width="100%"
                  cellPadding={0}
                  cellSpacing={0}
                  style={{ padding: "30px 44px 0" }}
                >
                  <tbody>
                    <tr>
                      <td>
                        <Img
                          src={LOGO}
                          height={40}
                          alt="Ascend"
                          style={{ display: "block" }}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Hero title block */}
                <table
                  width="100%"
                  cellPadding={0}
                  cellSpacing={0}
                  style={{ padding: "64px 44px 44px" }}
                >
                  <tbody>
                    <tr>
                      <td>
                        {/* Red accent bar */}
                        <div
                          style={{
                            width: 92,
                            height: 5,
                            backgroundColor: c.red,
                            marginBottom: 20,
                          }}
                        />
                        <Text
                          style={{
                            fontFamily: font,
                            fontSize: 13,
                            fontWeight: 800,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: "#fff",
                            margin: "0 0 14px",
                            opacity: 0.92,
                          }}
                        >
                          {val(content.heroSubtitle)}
                        </Text>
                        <Heading
                          as="h1"
                          style={{
                            fontFamily: font,
                            fontSize: 56,
                            fontWeight: 800,
                            lineHeight: "1",
                            letterSpacing: "-0.02em",
                            color: "#fff",
                            margin: 0,
                            maxWidth: 540,
                          }}
                        >
                          {val(content.heroTitle)}
                        </Heading>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Column>
            </Row>
          </Section>

          {/* ── EDITOR INTRO ─────────────────────────────────────────────── */}
          <Section style={{ padding: "52px 44px 8px" }}>
            <Row>
              <Column style={{ textAlign: "center" }}>
                <Text
                  style={{
                    fontFamily: font,
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: c.red,
                    margin: "0 0 14px",
                  }}
                >
                  {val(content.mainArticle.subTitle)}
                </Text>
                <Heading
                  as="h2"
                  style={{
                    fontFamily: font,
                    fontWeight: 800,
                    fontSize: 27,
                    color: c.ink,
                    letterSpacing: "-0.01em",
                    margin: "0 auto 16px",
                    maxWidth: 540,
                    lineHeight: "1.25",
                  }}
                >
                  {val(content.mainArticle.title)}
                </Heading>
                <Text
                  style={{
                    fontFamily: font,
                    fontSize: 15,
                    color: c.body,
                    margin: "0 auto",
                    maxWidth: 560,
                    lineHeight: "1.75",
                  }}
                >
                  {val(content.mainArticle.description)}
                </Text>
              </Column>
            </Row>
          </Section>

          {/* ── SPOTLIGHT ────────────────────────────────────────────────── */}
          <Section style={{ padding: "56px 44px 32px" }}>
            <Row>
              {/* Image column */}
              <Column style={{ width: 240, verticalAlign: "top" }}>
                <Img
                  src={val(content.spotlight.image)}
                  width={240}
                  height={290}
                  alt={val(content.spotlight.title, "Spotlight")}
                  style={{
                    display: "block",
                    width: "100%",
                    height: 290,
                    objectFit: "cover",
                    borderRadius: 4,
                  }}
                />
              </Column>

              {/* Text column */}
              <Column style={{ paddingLeft: 36, verticalAlign: "top" }}>
                <Eyebrow>In the Spotlight</Eyebrow>
                <Heading
                  as="h2"
                  style={{
                    fontFamily: font,
                    fontWeight: 800,
                    fontSize: 30,
                    lineHeight: "1.08",
                    letterSpacing: "-0.015em",
                    color: c.ink,
                    margin: "2px 0 18px",
                  }}
                >
                  {val(content.spotlight.title)}
                </Heading>
                <Text
                  style={{
                    fontFamily: font,
                    fontSize: 14.5,
                    color: c.body,
                    margin: 0,
                    lineHeight: "1.75",
                  }}
                >
                  {val(content.spotlight.description)}
                </Text>
                <Button
                  href={link(content.spotlight.link)}
                  style={{
                    display: "inline-block",
                    marginTop: 24,
                    backgroundColor: c.red,
                    color: "#fff",
                    fontFamily: font,
                    fontWeight: 700,
                    fontSize: 12,
                    letterSpacing: "0.12em",
                    textDecoration: "none",
                    padding: "13px 28px",
                    borderRadius: 30,
                    textTransform: "uppercase",
                  }}
                >
                  READ MORE
                </Button>
              </Column>
            </Row>
          </Section>

          {/* ── FEATURE BAND ─────────────────────────────────────────────── */}
          <Section
            style={{ backgroundColor: c.band, padding: "48px 44px 48px" }}
          >
            <Row>
              <Column>
                <Eyebrow light>On the Blog</Eyebrow>
                <Heading
                  as="h2"
                  style={{
                    fontFamily: font,
                    fontWeight: 800,
                    fontSize: 40,
                    lineHeight: "1",
                    letterSpacing: "-0.015em",
                    color: "#fff",
                    margin: "0 0 28px",
                  }}
                >
                  {val(content.blog.title)}
                </Heading>
              </Column>
            </Row>
            <Row>
              {/* Feature image */}
              <Column style={{ width: 240, verticalAlign: "middle" }}>
                <Img
                  src={val(content.blog.image)}
                  width={240}
                  height={150}
                  alt={val(content.blog.title, "Blog feature")}
                  style={{
                    display: "block",
                    width: "100%",
                    height: 150,
                    objectFit: "cover",
                    borderRadius: 4,
                  }}
                />
              </Column>
              {/* Feature text */}
              <Column style={{ paddingLeft: 36, verticalAlign: "middle" }}>
                <Text
                  style={{
                    fontFamily: font,
                    fontSize: 14,
                    color: c.bandSoft,
                    margin: 0,
                    lineHeight: "1.7",
                  }}
                >
                  {val(content.blog.description)}
                </Text>
              </Column>
            </Row>
          </Section>

          {/* ── MORE FROM THE FIELD ──────────────────────────────────────── */}
          <Section style={{ backgroundColor: c.band, padding: "0 44px 56px" }}>
            <Hr
              style={{
                borderColor: "rgba(255,255,255,0.12)",
                margin: "0 0 40px",
              }}
            />
            <Row>
              {/* Big heading */}
              <Column style={{ width: 240, verticalAlign: "top" }}>
                <Heading
                  as="h2"
                  style={{
                    fontFamily: font,
                    fontWeight: 800,
                    fontSize: 42,
                    lineHeight: "1.02",
                    letterSpacing: "-0.02em",
                    color: "#fff",
                    margin: 0,
                  }}
                >
                  {val(content.blog.subBlog.title)
                    .split(" ")
                    .map((word, index) => (
                      <React.Fragment key={index}>
                        {index > 0 && <br />}
                        {word}
                      </React.Fragment>
                    ))}
                </Heading>
              </Column>
              {/* Text + ghost CTA */}
              <Column style={{ paddingLeft: 36, verticalAlign: "top" }}>
                <Text
                  style={{
                    fontFamily: font,
                    fontSize: 14,
                    color: c.bandSoft,
                    margin: "0 0 24px",
                    lineHeight: "1.7",
                  }}
                >
                  {val(content.blog.subBlog.description)}
                </Text>
                <Button
                  href={link(content.blog.link)}
                  style={{
                    display: "inline-block",
                    backgroundColor: "transparent",
                    color: "#fff",
                    fontFamily: font,
                    fontWeight: 700,
                    fontSize: 12,
                    letterSpacing: "0.12em",
                    textDecoration: "none",
                    padding: "12px 28px",
                    borderRadius: 30,
                    border: "1.5px solid rgba(255,255,255,0.55)",
                    textTransform: "uppercase",
                  }}
                >
                  READ MORE
                </Button>
              </Column>
            </Row>
          </Section>

          {/* ── ARTICLE CARDS ────────────────────────────────────────────── */}
          <Section style={{ padding: "56px 44px" }}>
            <Row>
              {content.articles.map((article, index) => (
                <Column
                  key={index}
                  style={articleColumnStyles[index] ?? articleColumnStyles[0]}
                >
                  <Img
                    src={val(article.image)}
                    width="100%"
                    alt={val(article.title, "Article")}
                    style={{
                      display: "block",
                      width: "100%",
                      height: 175,
                      objectFit: "cover",
                      borderRadius: 4,
                      marginBottom: 18,
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: font,
                      color: c.red,
                      fontWeight: 800,
                      fontSize: 11,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      margin: "0 0 8px",
                    }}
                  >
                    {val(article.category)}
                  </Text>
                  <Heading
                    as="h3"
                    style={{
                      fontFamily: font,
                      fontWeight: 800,
                      fontSize: 18,
                      color: c.ink,
                      margin: "0 0 10px",
                      letterSpacing: "-0.01em",
                      lineHeight: "1.22",
                    }}
                  >
                    {val(article.title)}
                  </Heading>
                  <Text
                    style={{
                      fontFamily: font,
                      fontSize: 13.5,
                      color: c.body,
                      margin: "0 0 14px",
                      lineHeight: "1.7",
                    }}
                  >
                    {val(article.description)}
                  </Text>
                  <Link
                    href={link(article.link)}
                    style={{
                      color: c.red,
                      fontFamily: font,
                      fontWeight: 800,
                      fontSize: 12,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                    }}
                  >
                    Read More →
                  </Link>
                </Column>
              ))}
            </Row>
          </Section>

          {/* ── FULL-BLEED IMAGE ─────────────────────────────────────────── */}
          {/* Note: true CSS overlay not possible in email; dark caption band below image */}
          <Section style={{ padding: 0 }}>
            <Row>
              <Column>
                <Img
                  src={val(content.heroImage)}
                  width="100%"
                  alt={val(content.sideLines.title, "Featured image")}
                  style={{
                    display: "block",
                    width: "100%",
                    height: 300,
                    objectFit: "cover",
                    objectPosition: "center 35%",
                  }}
                />
              </Column>
            </Row>
            <Row>
              <Column
                style={{ backgroundColor: c.band, padding: "28px 44px 32px" }}
              >
                <Eyebrow light>From the Sidelines</Eyebrow>
                <Heading
                  as="h3"
                  style={{
                    fontFamily: font,
                    fontWeight: 800,
                    fontSize: 26,
                    color: "#fff",
                    margin: "0 0 16px",
                    letterSpacing: "-0.015em",
                    lineHeight: "1.22",
                    maxWidth: 520,
                  }}
                >
                  {val(content.sideLines.title)}
                </Heading>
                <Link
                  href={link(content.sideLines.link)}
                  style={{
                    color: c.red,
                    fontFamily: font,
                    fontWeight: 800,
                    fontSize: 12,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                  }}
                >
                  Read More →
                </Link>
              </Column>
            </Row>
          </Section>

          {/* ── WHAT'S NEXT ──────────────────────────────────────────────── */}
          <Section style={{ backgroundColor: c.panel, padding: "52px 44px" }}>
            <Row>
              <Column style={{ textAlign: "center" }}>
                <Text
                  style={{
                    fontFamily: font,
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: c.red,
                    margin: "0 0 14px",
                  }}
                >
                  What&apos;s Next?
                </Text>
                <Heading
                  as="h2"
                  style={{
                    fontFamily: font,
                    fontWeight: 800,
                    fontSize: 26,
                    color: c.ink,
                    letterSpacing: "-0.01em",
                    margin: "0 auto 14px",
                    maxWidth: 520,
                    lineHeight: "1.3",
                  }}
                >
                  {val(content.whatNext.title)}
                </Heading>
                <Text
                  style={{
                    fontFamily: font,
                    fontSize: 14.5,
                    color: c.body,
                    margin: "0 auto",
                    maxWidth: 540,
                    lineHeight: "1.75",
                  }}
                >
                  {val(content.whatNext.description)}
                </Text>
              </Column>
            </Row>
          </Section>

          {/* ── FOOTER ───────────────────────────────────────────────────── */}
          <Section style={{ backgroundColor: c.band, padding: "40px 44px 0" }}>
            {/* Logo */}
            <Row>
              <Column style={{ textAlign: "center", paddingBottom: 28 }}>
                <Img
                  src={LOGO}
                  height={44}
                  alt="Ascend"
                  style={{ display: "inline-block" }}
                />
              </Column>
            </Row>

            {/* CTA buttons */}
            <Row>
              <Column style={{ textAlign: "center", paddingBottom: 28 }}>
                <Button
                  href="https://ascendapp.ca/#contact"
                  style={{
                    display: "inline-block",
                    backgroundColor: c.red,
                    color: "#fff",
                    fontFamily: font,
                    fontWeight: 700,
                    fontSize: 12,
                    letterSpacing: "0.12em",
                    textDecoration: "none",
                    padding: "13px 28px",
                    borderRadius: 30,
                    textTransform: "uppercase",
                    marginRight: 14,
                  }}
                >
                  Book a Demo
                </Button>
                <Button
                  href="https://ascendapp.ca/#contact"
                  style={{
                    display: "inline-block",
                    backgroundColor: "transparent",
                    color: "#fff",
                    fontFamily: font,
                    fontWeight: 700,
                    fontSize: 12,
                    letterSpacing: "0.12em",
                    textDecoration: "none",
                    padding: "12px 28px",
                    borderRadius: 30,
                    border: "1.5px solid rgba(255,255,255,0.4)",
                    textTransform: "uppercase",
                  }}
                >
                  Contact Us
                </Button>
              </Column>
            </Row>

            {/* Social links */}
            <Row>
              <Column style={{ textAlign: "center", paddingBottom: 24 }}>
                <SocialLink
                  href="https://www.youtube.com/@AscendSportsCoaching"
                  Icon={CiYoutube}
                />
                <SocialLink
                  href="https://instagram.com/ascendcoachingapp"
                  Icon={CiInstagram}
                />
                <SocialLink
                  href="https://www.facebook.com/people/Ascend-Coaching-App/61575932845041/"
                  Icon={CiFacebook}
                  last
                />
              </Column>
            </Row>

            <Hr
              style={{
                borderColor: "rgba(255,255,255,0.12)",
                margin: "0 0 22px",
              }}
            />

            {/* Contact links */}
            <Row>
              <Column style={{ textAlign: "center", paddingBottom: 0 }}>
                <Text
                  style={{
                    fontFamily: font,
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#fff",
                    letterSpacing: "0.03em",
                    margin: 0,
                  }}
                >
                  <Link
                    href="https://ascendapp.ca/"
                    style={{ color: "#fff", textDecoration: "none" }}
                  >
                    ascendapp.ca
                  </Link>
                  &nbsp;&nbsp;·&nbsp;&nbsp;
                  <Link
                    href="mailto:contact@ascendapp.ca"
                    style={{ color: "#fff", textDecoration: "none" }}
                  >
                    contact@ascendapp.ca
                  </Link>
                </Text>
              </Column>
            </Row>

            <Hr
              style={{
                borderColor: "rgba(255,255,255,0.12)",
                margin: "22px 0 18px",
              }}
            />

            {/* Legal */}
            <Row>
              <Column style={{ textAlign: "center", paddingBottom: 28 }}>
                <Text
                  style={{
                    fontFamily: font,
                    fontSize: 11.5,
                    color: "rgba(255,255,255,0.55)",
                    letterSpacing: "0.02em",
                    lineHeight: "1.7",
                    margin: 0,
                  }}
                >
                  You are receiving this because you are subscribed to the
                  Ascend app.
                  <br />
                  <Link
                    href="{% unsubscribe_link %}"
                    style={{
                      color: "rgba(255,255,255,0.75)",
                      textDecoration: "underline",
                    }}
                  >
                    Unsubscribe
                  </Link>
                  &nbsp;·&nbsp;
                  <Link
                    href="https://ascendapp.ca/privacy"
                    style={{
                      color: "rgba(255,255,255,0.75)",
                      textDecoration: "underline",
                    }}
                  >
                    Privacy Policy
                  </Link>
                </Text>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
