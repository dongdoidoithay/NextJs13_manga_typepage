import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className="dark [--scroll-mt:9.875rem] lg:[--scroll-mt:6.3125rem] js-focus-visible lg:mx-24">
      <Head />
      <body className="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 bg-[url('/grid.svg')]">
        <Main />
        <NextScript />



        {/* Google tag */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-JC4MTH4WSV"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            document.addEventListener("DOMContentLoaded", function() 
            {
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-JC4MTH4WSV');
            }); `,
          }}
        /> 
      </body>
    </Html>
  )
}
