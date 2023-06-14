import { MangaLang } from "@/constants/configBase";

export function getDate(date: string,config: any) {
    let result='';
    try {
        var  _exp = Date.parse(date);
        let ts=new Date(Date.now()-_exp);
        let differentYear = Math.ceil( (Date.now()-_exp)/ (1000 * 60 * 60 * 24* 30 * 12));
        let differentMonth = Math.ceil( (Date.now()-_exp)/ (1000 * 60 * 60 * 24* 30));
        let differentDays = Math.ceil( (Date.now()-_exp)/ (1000 * 60 * 60 * 24));
        let differentHour = Math.ceil( (Date.now()-_exp)/ (1000 * 60 * 60));
        let differentMinute = Math.ceil( (Date.now()-_exp)/ (1000 * 60));
        if(differentDays<=1)
        {
            if(differentMinute<60){
                if (differentMinute < 2)
                {
                    return config.configSetting.lbl_date_now;
                }
                else
                {
                    result=`${differentMinute} ${config.configSetting.lbl_date_minutes}`;
                }
            }else{
                if(differentHour===1)
                    result=`1  ${config.configSetting.lbl_date_hour}`;
                else
                    result=`${differentHour} ${config.configSetting.lbl_date_hour}s`;
            }
        }
        else if (differentDays-1 == 0)
        {
            result=`${config.configSetting.lbl_date_yesterday}`;
        }
        else
        {
            if(differentDays>30){
                if(differentMonth>12){
                    result=`${differentYear} ${config.configSetting.lbl_date_years}`;
                }else{
                result=`${differentMonth} ${config.configSetting.lbl_date_months}`;
                }
            }
            else{
            result=`${differentDays} ${config.configSetting.lbl_date_days}`;
            }
        }
        return result;
    } 
    catch (e) 
    {
      return result;
    }
  }
export default getDate;