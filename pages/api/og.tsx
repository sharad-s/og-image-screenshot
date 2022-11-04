import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { DB } from "../../lib/db";

// https://vercel.com/docs/concepts/functions/edge-functions/og-image-examples

export const config = {
  runtime: "experimental-edge",
};

export default function (req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // ?username=<username>
  const hasUsername = searchParams.has("username");
  const username = hasUsername
    ? searchParams.get("username")?.slice(0, 100)
    : undefined;

  const img = username
    ? DB[username]
    : "https://beta.catalog.works/assets/icons/logo.svg";

  return new ImageResponse(
    (
      <div
        className=""
        style={{
          background: "black",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <div
          style={{
            fontSize: 128,
            background: "red",
            width: "100%",
            height: "33.33%",
            display: "flex",
            textAlign: "center",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <p></p>
        </div>
        <div
          style={{
            fontSize: 40,
            width: "100%",
            flexBasis: "33%",
            height: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: 40,
              height: "100%",
              display: "flex",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              padding: "20px",
            }}
          >
            <p>CATALOG</p>
            <img
              src={img}
              style={{
                height: "80%",
                padding: "20px",
                borderRadius: "50px",
              }}
            />
          </div>
        </div>
        <div
          style={{
            fontSize: 128,
            background: "green",
            width: "100%",
            height: "33.33%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
}
