/* import {DiscussionEmbed}  from "disqus-react" */

import { AxiosPostApi } from "@/constants/FetchApi";
import { SelectMangaTypeByPage, apiConfigPath } from "@/constants/configBase";
import ReactDisqusComments from "react-disqus-comments";

const DisqusComments = ({ id, image, title, url, type }:any) => {
  let config = SelectMangaTypeByPage("");
  const disqusShortname = "rawkuma-1";

  const mapComment = (data: any) => {
    let _result = "";
    if (data != null) {
      let _sp = data.split(" ");
      for (let c of _sp) {
        if (c.startsWith("http://") || c.startsWith("https://"))
          _result += `<img src='${c}' alt='comment'/>`;
        else _result += `${c}`;
      }
    }
    return _result;
  };
  const handleNewComment = async (comment: any) => {
    //console.log("comment", comment);

    const params = new URLSearchParams({
      id_ref: comment.id,
      id_manga: id,
      image_manga: image,
      name_manga: title,
      type_manga: type,
      domain: config.configSetting.lbl_domain_Page,
      contents: mapComment(comment.text),
    });

    console.log("_datapost", params);
    await AxiosPostApi(
      apiConfigPath + config.endPointPath.configAddcomment,
      params
    );
  };
  return (
    <>
      {/*@ts-ignore*/}
      <ReactDisqusComments
        shortname={disqusShortname}
        identifier={id}
        title={title}
        url={url}
        category_id="manga"
        onNewComment={(value: any) => handleNewComment(value)}
      />
    </>
  );
};

export default DisqusComments;
