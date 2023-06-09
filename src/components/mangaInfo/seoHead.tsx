import baseSeo from "@/constants/baseSeo";
import { Helmet } from "react-helmet";

const SeoHead = ({ title, desc, key_word, url, locale, image }: {title:string; desc:string;  key_word:string;  url:string;  locale:any;  image:string; }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={desc} />
            <meta name="keywords" content={key_word} />

            <link rel="archives" href={`https://web.archive.org/web/${url}`} />
            <meta name="category" content="manga, novels, comic, anime" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={desc} />
            <meta property="og:site_name" content={baseSeo.domainName} />
            <meta property="og:locale" content={locale ? locale : baseSeo.locale} />
            <meta property="og:image" content={image} />
            <meta property="og:image:width" content="800" />
            <meta property="og:image:height" content="600" />
            <meta property="og:image:alt" content={title} />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={baseSeo.twitterSite} />
            <meta name="twitter:creator" content={baseSeo.domainName} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:image:alt" content={desc} />
            <meta property="al:ios:app_store_id" content="app_store_id" />
            <meta property="al:ios:url" content={url} />
            <meta property="al:android:package" content={baseSeo.domainName} />
            <meta property="al:android:url" content={url} />
            <meta property="al:web:url" content={url} />
            <meta property="al:web:should_fallback" content="false" />
            <link rel="icon" href={baseSeo.Icon}></link>
        </Helmet>
    )

}
export default SeoHead;