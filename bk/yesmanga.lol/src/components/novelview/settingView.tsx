import { getStorage, setStorage } from "@/utils/localFx";
import { XMarkIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ModelSettingView = ({
    show,
    setShow,
    config,
    data,
    fontSize,
    setfontSize,
    lineHieght,
    setLineHieght,
    bgColor,
    setBgColor,
    colorSelect,
    setColorSelect,
    fontFamilySelect,
    setFontFamilySelect }: {
        show: boolean,
        setShow: any,
        config: any,
        data: any,
        fontSize: any,
        setfontSize: any,
        lineHieght: any,
        setLineHieght: any,
        bgColor: any,
        setBgColor: any,
        colorSelect: any,
        setColorSelect: any,
        fontFamilySelect: any,
        setFontFamilySelect: any

    }) => {
    let _fontSize = getStorage("View-Setting-fontSize");
    let _lineHieght = getStorage("View-Setting-lineHieght");
    let _bgColor = getStorage("View-Setting-bgColor");
    let _colorSelect = getStorage("View-Setting-colorSelect");
    let _fontFamilySelect = getStorage("View-Setting-fontFamilySelect");
    useEffect(() => {
        if (_fontSize != null && _fontSize != '') {
            console.log("_fontSize", _fontSize)
            ChangeFontSize(parseFloat(_fontSize));
        }
        if (_lineHieght != null && _lineHieght != '') {
            ChangeLineHeight(parseFloat(_lineHieght))
        }
        if (_bgColor != null && _bgColor != '') {
            setBgColor(_bgColor)
        }
        if (_colorSelect != null && _colorSelect != '') {
            setColorSelect(_colorSelect);
        }
        if (_fontFamilySelect != null && _fontFamilySelect != '') {
            setFontFamilySelect(_fontFamilySelect)
        } /**/

    }, [])
    function ChangeFontSize(value: any) {
        //console.log("setfontSize",value)
        setfontSize(value);
        setStorage("View-Setting-fontSize", `${value}`, 30 * 24 * 60 * 60);
        return `${value} px`;
    }
    function ChangeLineHeight(value: any) {
        setLineHieght(value);
        setStorage("View-Setting-lineHieght", `${value}`, 30 * 24 * 60 * 60);
        return `${value} px`;
    }

    const handleChangeBackgroud = (event: { target: { value: string } }) => {
        setBgColor(event.target.value);
        setStorage("View-Setting-bgColor", `${event.target.value}`, 30 * 24 * 60 * 60);
    };
    const handleChangeColor = (event: { target: { value: string } }) => {
        setColorSelect(event.target.value);
        setStorage("View-Setting-colorSelect", `${event.target.value}`, 30 * 24 * 60 * 60);
    };
    const handleChangeFontFamily = (event: { target: { value: string, name: string } }) => {
        // console.log('fontFamilySelect',event.target.value);
        setFontFamilySelect(event.target.value)
        setStorage("View-Setting-fontFamilySelect", `${event.target.value}`, 30 * 24 * 60 * 60);
    };

    const handleRestart = () => {
        //font Size
        ChangeFontSize(19);
        //line hieght
        ChangeLineHeight(1.9);
        //backGroud
        setBgColor(null);
        setStorage("View-Setting-bgColor", '', 30 * 24 * 60 * 60);
        //color
        setColorSelect(null);
        setStorage("View-Setting-colorSelect", '', 30 * 24 * 60 * 60);
        //Font family
        setFontFamilySelect(null)
        setStorage("View-Setting-fontFamilySelect", '', 30 * 24 * 60 * 60);

        toast.info('🦄 you are change Setting Deffault', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    }
    const _lsColor = ['aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'black', 'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgrey', 'darkgreen', 'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dimgrey', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'grey', 'green', 'greenyellow', 'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgrey', 'lightgreen', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightslategrey', 'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy', 'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'purple', 'rebeccapurple', 'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue', 'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgreen'];
    const _lsFontFamily = [
        {
            lable: "Lucida Sans",
            value: `"Lucida Sans","Lucida Sans Regular", "Lucida Grande","Lucida Sans Unicode", Geneva, Verdana, "sans-serif", roboto','dancing script,cursive`,
        },
        {
            lable: "Dancing Script",
            value: `dancing script,cursive`,
        },
        {
            lable: "Merriweather",
            value: `merriweather`,
        },
        {
            lable: "Roboto",
            value: `roboto`,
        },
        {
            lable: "literata",
            value: `literata,serif`,
        },
        { value: '"Palatino Linotype", serif', lable: 'Palatino Linotype' },
        { value: 'Bookerly, serif', lable: 'Bookerly' },
        { value: 'Minion, serif', lable: 'Minion' },
        { value: '"Segoe UI", sans-serif', lable: 'Segoe UI' },
        { value: 'Roboto, sans-serif', lable: 'Roboto' },
        { value: '"Roboto Condensed", sans-serif', lable: 'Roboto Condensed' },
        { value: '"Patrick Hand", sans-serif', lable: 'Patrick Hand' },
        { value: '"Noticia Text", sans-serif', lable: 'Noticia Text' },
        { value: '"Times New Roman", serif', lable: 'Times New Roman' },
        { value: 'Verdana, sans-serif', lable: 'Verdana' },
        { value: 'Tahoma, sans-serif', lable: 'Tahoma' },
        { value: 'Arial, sans-serif', lable: 'Arial' }
    ];

    return (
        <>
            {show && <div className="fixed inset-0 z-50 overflow-auto bg-slate-950 bg-opacity-75">
                <div className="relative mx-auto max-w-lg mt-20">
                    <div className="bg-slate-200 rounded-lg px-4 py-3">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold text-sky-500">Setting View</h2>
                            <button className="text-sky-500 hover:text-gray-400" onClick={() => setShow(!show)}>
                                <XMarkIcon className="inline w-8 hover:animate-pulse"/>
                            </button>
                        </div>
                        <p className="text-sky-300 mb-4">
                            <p className="block mb-1 text-md font-semibold text-sky-500">Line height [<strong className="text-orange-700">{lineHieght}/3</strong>]</p>
                            <input 
                                type="range" 
                                value={lineHieght}
                                step={0.1}
                                min={1.0}
                                max={3.0}
                                onChange={(event)=>ChangeLineHeight(event.target.value)}
                                className="w-full h-1 bg-sky-100 rounded-lg appearance-none cursor-pointer dark:bg-sky-500" 
                                />
                        </p>
                        <p className="text-sky-300 mb-4">
                            <p className="block mb-1 text-md font-semibold text-sky-500">Font Size [<strong className="text-orange-700">{fontSize}/40</strong>]</p>
                            <input 
                                type="range" 
                                value={fontSize}
                                step={1}
                                min={14}
                                max={40}
                                onChange={(event)=>ChangeFontSize(event.target.value)}
                                className="w-full h-1 bg-sky-100 rounded-lg appearance-none cursor-pointer dark:bg-sky-500" 
                                />
                        </p>
                        <p className=" mb-4">
                            <p className="block mb-1 text-md font-semibold text-sky-500">Backgroud Color</p>
                            <select onChange={(e)=>handleChangeBackgroud(e)} className="text-orange-700 text-md rounded-lg block w-full p-2.5   placeholder-sky-400" style={{backgroundColor:bgColor}}>
                            <option value={``} >-- Select --</option>
                                 {_lsColor.map((item,index)=>{
                                    if(item==bgColor)
                                        return  <option key={index} selected value={item} style={{backgroundColor:item}} >{item}</option>
                                    else
                                        return  <option key={index}  value={item} style={{backgroundColor:item}} >{item}</option>
                                })}
                            </select>
                        </p>
                        <p className=" mb-4">
                            <p className="block mb-1 text-md font-semibold text-sky-500">Color</p>
                            <select onChange={(e)=>handleChangeColor(e)} className=" text-orange-700 text-md rounded-lg block w-full p-2.5   placeholder-sky-400" style={{color:colorSelect}}>
                            <option value={``} >-- Select --</option>
                                 {_lsColor.map((item,index)=>{
                                    if(item==colorSelect)
                                        return  <option key={index} selected value={item} style={{borderColor:item,backgroundColor:item}} className={`border-b-2`}>{item}</option>
                                    else
                                        return  <option  key={index} value={item} style={{borderColor:item,backgroundColor:item}} className={`border-b-2`}>{item}</option>
                                })}
                            </select>
                        </p>
                        <p className=" mb-4">
                            <p className="block mb-1 text-md font-semibold text-sky-500">Font Family</p>
                            <select onChange={(e)=>handleChangeFontFamily(e)} className="text-orange-700 text-md rounded-lg block w-full p-2.5   placeholder-sky-400" style={{fontFamily:fontFamilySelect}}>
                                <option value={``} >-- Select --</option>
                                 {_lsFontFamily.map((item,index)=>{
                                    if(item.value==fontFamilySelect)
                                        return  <option key={index} selected value={item.value} >{item.lable}</option>
                                    else
                                        return  <option  key={index} value={item.value} >{item.lable}</option>
                                })}
                            </select>
                        </p>

                        <div className="flex justify-end">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 w-full" onClick={()=>handleRestart()}>
                            Reset Default Setting
                            </button>
                        
                        </div>
                    </div>
                </div>
            </div>
            } 
        </>
    )
}
export default ModelSettingView;