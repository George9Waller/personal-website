import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeDetailProps {
  theme: string;
}

const ThemeDetail = (props: ThemeDetailProps) => {
  const [mounted, setMounted] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <li>
        <a className="btn btn-ghost loading"></a>
      </li>
    );
  }

  return (
    <div className="outline-base-content overflow-hidden rounded-lg outline outline-2 outline-offset-2">
      <div
        data-theme={props.theme}
        className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
        onClick={() => setTheme(props.theme)}
      >
        <div className="grid grid-cols-5 grid-rows-3">
          <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
            <div className="flex-grow text-sm font-bold">{props.theme}</div>
            <div className="flex flex-shrink-0 flex-wrap gap-1">
              <div className="bg-primary w-2 rounded"></div>
              <div className="bg-secondary w-2 rounded"></div>
              <div className="bg-accent w-2 rounded"></div>
              <div className="bg-neutral w-2 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <li>
        <a className="btn btn-ghost loading"></a>
      </li>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 p-3">
      <ThemeDetail theme="light" />
      <ThemeDetail theme="dark" />
      <ThemeDetail theme="cupcake" />
      <ThemeDetail theme="bumblebee" />
      <ThemeDetail theme="emerald" />
      <ThemeDetail theme="corporate" />
      <ThemeDetail theme="synthwave" />
      <ThemeDetail theme="retro" />
      <ThemeDetail theme="cyberpunk" />
      <ThemeDetail theme="garden" />
      <ThemeDetail theme="forest" />
      <ThemeDetail theme="aqua" />
      <ThemeDetail theme="lofi" />
      <ThemeDetail theme="pastel" />
      <ThemeDetail theme="fantasy" />
      <ThemeDetail theme="dracula" />
      <ThemeDetail theme="cmyk" />
      <ThemeDetail theme="acid" />
      <ThemeDetail theme="night" />
      <ThemeDetail theme="coffee" />
      <ThemeDetail theme="winter" />
    </div>
  );
};

export default ThemeSwitch
