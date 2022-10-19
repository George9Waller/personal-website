import Link from "next/link";

export const PrintsAvailableBanner = () => (
  <div className="my-4">
    <Link href="/prints">
      <a className="prints-banner">
        <div className="frame w-auto mx-4 border-8 bg-base-100 border-accent hover:border-secondary drop-shadow-lg">
          <div className="mount w-auto border-20 border-base-300 hover:border-accent p-4">
            <h1 className="text-xl m-auto text-center mb-4 font-medium">
              Prints Available!
            </h1>
            <p className="text-center">
              For more information and to get yourself a print please see the{" "}
              <Link href="/prints">
                <a className="link link-secondary">prints page</a>
              </Link>
              .
            </p>
          </div>
        </div>
      </a>
    </Link>
  </div>
);
