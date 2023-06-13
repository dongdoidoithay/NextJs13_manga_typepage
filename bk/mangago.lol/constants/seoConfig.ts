import { _lbl_domain_name, _sb_seo_default_image, _sb_seo_df_title, _sb_seo_page_default_desc, _sb_seo_page_default_key } from "./configSettingBase";

export default {
    title:_sb_seo_df_title,
    description:_sb_seo_page_default_desc,
    keywords:_sb_seo_page_default_key,
    canonical: `https://${_lbl_domain_name}`,
    openGraph: {
      type: 'website',
      locale: 'en-Gb',
      url:  `https://${_lbl_domain_name}`,
      title: _sb_seo_df_title,
      description: _sb_seo_page_default_desc,
      images: [
        {
          url: _sb_seo_default_image,
          width: 800,
          height: 600,
          alt: _sb_seo_df_title,
        }
      ],
    },
    twitter: {
      handle: _sb_seo_df_title,
      site: `https://${_lbl_domain_name}`,
      cardType: 'summary_large_image',
    },
  };
  