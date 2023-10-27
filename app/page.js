import Header from "./components/header";
import Link from "next/link";

export default function Home() {
  const carouselImages = [
    "/landing_page/carousel01.jpeg",
    "/landing_page/carousel02.jpeg",
    "/landing_page/carousel03.jpeg",
  ];

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "white",
      }}
    >
      <Header />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100vh",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url('/landing_page/carousel01.jpeg')`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
          <div
            style={{
              flexBasis: "50%",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              justifyItems: "center",
              display: "flex",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "60vh",
                height: "55vh",
                backgroundColor: "white",
                padding: "8px",
                paddingTop: "14px",
                borderRadius: "8px",
                opacity: "0.8",
                color: "black",
                spacing: "6px",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontFamily: "serif",
                }}
              >
                Chocolate Chip Cupcakes
                Back For A Limited
                <br />
                Time!
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  fontFamily: "light",
                  textAlign: "center",
                  fontFamily: "serif",
                  paddingBottom: "9px",
                }}
              >
                Indulge in the delightful return of our Chocolate Chip Cupcakes,
                available for a limited time. Treat yourself to the rich,
                chocolaty goodness you've been craving.
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Link href="pages/products">
                  <button
                    style={{
                      borderRadius: "8px",
                      backgroundColor: "black",
                      opacity: "0.7",
                      padding: "3px",
                      paddingLeft: "5px",
                      fontWeight: "normal",
                      border: "2px solid black",
                    }}
                  >
                    <div style={{color:"white"}}>Order Now</div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
