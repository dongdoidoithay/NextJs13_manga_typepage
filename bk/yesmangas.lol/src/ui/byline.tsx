import { SelectMangaTypeByPage } from "@/constants/configBase";

export default function Byline({ className }: { className: string }) {
    let config = SelectMangaTypeByPage('');
    return (
      <div
        className={`${className} inset-x-0 bottom-3 mx-3 rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-slate-900/20`}
      >
        <div className="flex flex-col justify-between space-y-2 rounded-lg bg-slate-800/90 p-3.5 lg:px-5 lg:py-3">
          <div className="flex items-center gap-x-1.5">
            <div className="text-sm text-gray-400"><span className="text-sky-500 font-semibold">Donate:</span> Your gift today can help us cover the costs of maintaining and upgrading our website..</div>
          </div>
  
          <div className="text-sm text-gray-400 flex flex-row flex-wrap gap-4 items-center justify-center text-center">
          <a href='https://paypal.me/manganew' className="rounded-md bg-gradient-to-r from-slate-400 to-gray-300 p-1"  target='_blank'><img src={`${config.configPrefix.url_host}/paypal-me.png`} alt="logo" className="h-8"/> </a>
          <a href='https://www.buymeacoffee.com/manga' className="rounded-md bg-gradient-to-r from-slate-400 to-gray-300 p-1 w-14 " target='_blank'><img src={`${config.configPrefix.url_host}/buycoffee.png`} alt="logo" className="h-8 items-center text-justify justify-center pl-2" /> </a>
          <a href='https://ko-fi.com/I2I6HKFHB' target='_blank'><img className="border-0 h-9" src='https://storage.ko-fi.com/cdn/kofi3.png?v=3' alt='Buy Me a Coffee at ko-fi.com' /></a>
          
          </div>
        </div>
      </div>
    );
  }
  