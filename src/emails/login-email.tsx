import { Button } from "@react-email/button";
import { Container } from "@react-email/container";
import { Head } from "@react-email/head";
import { Heading } from "@react-email/heading";
import { Html } from "@react-email/html";
import { Text } from "@react-email/text";

export default function LoginEmail({
  email,
  token,
  loginLink,
}: { email: string; token: string; loginLink: string }) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>RUN4BIBLE Login</title>
      </Head>

      <body style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
          }}
        >
          <Heading style={{ textAlign: "center", color: "#333" }}>
            Login to RUN4BIBLE
          </Heading>

          <Text style={{ color: "#555", marginTop: "10px" }}>
            Hi {email},<br />
            Use the code below to login to your account. If you did not request
            this code, you can safely ignore this email.
          </Text>

          <Text
            style={{
              color: "#007bff",
              fontWeight: "bold",
              fontSize: "32px",
              marginBlock: "20px",
              textAlign: "center",
            }}
          >
            {token}
          </Text>

          <Text style={{ color: "#555" }}>
            You can also log in using the button below:
          </Text>

          <Button
            href={loginLink}
            style={{
              display: "block",
              width: "auto",
              padding: "12px 20px",
              backgroundColor: "#007bff",
              color: "#ffffff",
              textDecoration: "none",
              textAlign: "center",
              borderRadius: "4px",
              marginTop: "20px",
              fontWeight: "bold",
            }}
          >
            Log In
          </Button>
        </Container>
      </body>
    </Html>
  );
}
