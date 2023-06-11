import ImageLoading from '@/ui/ImageLoading';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AdsViews from '../../ads/ads_view';
import AdsDetail from '../../ads/ads_detail';
import { getStorage, setStorage } from '@/utils/localFx';


const ContenView = ({ data, fontSize, config, lineHeight, bgColor, colorSelect, fontFamilySelect }: any) => {
   let synth: any = null;
   let _audioSelect = getStorage("View-Setting-audioSelect");
   let _autoSpeak = getStorage("View-Setting-autoSpeak");

   let _volumeSpeak = getStorage("View-Setting-volumeSpeak");
   let _pitchSpeak = getStorage("View-Setting-pitchSpeak");
   let _rateSpeak = getStorage("View-Setting-rateSpeak");

   const [selectedVoice, setSelectedVoice] = useState<number>(0);
   const [selectedVolume, setSelectedVolume] = useState(0.5);
   const [selectedRate, setSelectedRate] = useState(1);
   const [selectedPitch, setSelectedPitch] = useState(1);
   const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
   const [autoSpeak, setAutoSpeak] = useState<boolean>(false);

   //state Play Audio
   const [play, setPlay] = useState<boolean>(false);
   const [pause, setPause] = useState<boolean>(false);
   useEffect(() => {
      setSelectedVolume(0.5);
      setSelectedRate(1);
      setSelectedPitch(1);
      if (_audioSelect != null && _audioSelect != '') {
         setSelectedVoice(parseInt(_audioSelect))
      }
      if (_volumeSpeak != null && _volumeSpeak != '') {
         setSelectedVolume(parseFloat(_volumeSpeak))
      }
      if (_rateSpeak != null && _rateSpeak != '') {
         setSelectedRate(parseFloat(_rateSpeak))
      }
      if (_pitchSpeak != null && _pitchSpeak != '') {
         setSelectedPitch(parseFloat(_pitchSpeak))
      }
      if (_autoSpeak != null && _autoSpeak != '') {
         setAutoSpeak((_autoSpeak === 'true'))
      }
   }, [])
   useEffect(() => {
      if (window) {
         synth = window.speechSynthesis;
      }
   }, [synth]);

   const populateVoiceList = useCallback(() => {
      if (synth) {
         const newVoices = synth?.getVoices();

         if (newVoices.length > 0) {
            setVoices(newVoices);
         }
      }
   }, []);

   useEffect(() => {
      populateVoiceList();

   }, [populateVoiceList]);
   useEffect(() => {
      window.addEventListener('load', handleLoad);
   })
   const handleLoad = () => {
      if (voices.length <= 0 && synth) {
         const newVoices = synth?.getVoices();
         setVoices(newVoices);
         if (_autoSpeak == 'true') {
            console.log("speak load chapter");
            playSpeak();
         }
      }
   }

   const handleChangeVoiceSelect = (event: { target: { value: string, name: string } }) => {
      // console.log('fontFamilySelect',event.target.value);
      setSelectedVoice(parseInt(event.target.value));
      setStorage("View-Setting-audioSelect", `${event.target.value}`, 30 * 24 * 60 * 60);
   };
   function ChangeVoluneSpeak(value: number) {
      setSelectedVolume(value);
      setStorage("View-Setting-volumeSpeak", `${value}`, 30 * 24 * 60 * 60);
      return `${value} px`;
   }
   function ChangeRateSpeak(value: number) {
      setSelectedRate(value);
      setStorage("View-Setting-rateSpeak", `${value}`, 30 * 24 * 60 * 60);
      return `${value} px`;
   }
   function ChangePitchSpeak(value: number) {
      setSelectedPitch(value);
      setStorage("View-Setting-pitchSpeak", `${value}`, 30 * 24 * 60 * 60);
      return `${value} px`;
   }
   const ChangeAutoSpeak = (event: React.ChangeEvent<HTMLInputElement>) => {
      setAutoSpeak(event.target.checked);
      setStorage("View-Setting-autoSpeak", `${event.target.checked}`, 30 * 24 * 60 * 60);

   };
   const reastartSpeak = () => {
      setAutoSpeak(false);
      setStorage("View-Setting-autoSpeak", `${false}`, 30 * 24 * 60 * 60);
      //
      setSelectedPitch(1);
      setStorage("View-Setting-pitchSpeak", `${1}`, 30 * 24 * 60 * 60);
      //
      setSelectedRate(1);
      setStorage("View-Setting-rateSpeak", `${1}`, 30 * 24 * 60 * 60);
      //
      setSelectedVolume(0.5);
      setStorage("View-Setting-volumeSpeak", `${0.5}`, 30 * 24 * 60 * 60);
      //
      setSelectedVoice(0);
      setStorage("View-Setting-audioSelect", `${0}`, 30 * 24 * 60 * 60);
   }
   const speak = (selectIndex: number) => {

      if (selectIndex == undefined)
         selectIndex = 0;
      const next_index = selectIndex + 1;
      window.speechSynthesis.cancel();
      console.log("Speak text::", data.source.split('#')[selectIndex]);

      let hash = "#" + (selectIndex);
      window.location.hash = hash;
      window.scroll({
         top: 0,
         left: 0,
         behavior: 'smooth'
      });

      //window.document.getElementById(`${selectIndex}`).classList.add('slect-voice');
      let element = document.getElementById(`${selectIndex}`);
      if (element) {
         element.classList.add('slect-voice');
      }
      const synth = window.speechSynthesis;
      var utterance = new SpeechSynthesisUtterance(data.source.split('#')[selectIndex]);
      utterance.voice = synth.getVoices()[selectedVoice];

      utterance.addEventListener('end', function () {
         // setSelectedindex(selectedindex+1) ;
         //console.log("end::::");
         let element = document.getElementById(`${selectIndex}`);
         if (element) {
            element.classList.remove('slect-voice');
         }
         if (next_index < data.source.split('#').length)
            speak(next_index);
         else {
            window.speechSynthesis.cancel();
            toast.info('🦄 you are reading next chapter', {
               position: "bottom-center",
               autoClose: 500,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined
            });
            //next chapter
            if (data.idDetailNext != '' && data.idDetailNext != null)
               window.location.href = `${config.configPrefix.url_host}${config.configPrefix.pageViewManga}/${config.configPrefix.startManga}${data.idDoc}/${config.configPrefix.startViewmanga}${data.idDetailNext}${config.configPrefix.endViewmanga}`;
            else {
               toast.warn('🦄 you are reading the last chapter. You can read other Manga waiting for the new chapter to update !', {
                  position: "bottom-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined
               });
            }
         }

      });

      synth.speak(utterance);
   };
   const pauseSpeak = () => {
      window.speechSynthesis.pause();
      window.speechSynthesis.pause();
      setPlay(false);
      setPause(true);
      toast.info('🦄 Chapter start pause', {
         position: "bottom-center",
         autoClose: 500,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined
      });

   }
   const resumSpeak = () => {
      if (window.speechSynthesis.paused) {
         window.speechSynthesis.resume();
         setPlay(true);
         setPause(false);
         toast.info('🦄 Chapter start resume', {
            position: "bottom-center",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
         });
      } else {
         toast.warn('🦄 Chapter playing', {
            position: "bottom-center",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
         });
      }

   }
   const playSpeak = () => {
      if (play == false) {
         speak(0);
         setPlay(true);
         toast.info('🦄 Chapter start play', {
            position: "bottom-center",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
         });
      }

      else {
         toast.warn('🦄 Chapter redding play', {
            position: "bottom-center",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
         });
      }
   }
   const speakTest = (selectIndex: number) => {
      console.log("slect test speak", selectIndex);
      if (selectIndex == undefined)
         selectIndex = 0;
      const next_index = selectIndex + 1;
      window.speechSynthesis.cancel();
      console.log("Speak text::", data.source.split('#')[selectIndex]);

      // window.document.getElementById(`${selectIndex}`).classList.add('slect-voice');
      let element = document.getElementById(`${selectIndex}`);
      if (element) {
         element.classList.add('slect-voice');
      }
      const synth = window.speechSynthesis;
      var utterance = new SpeechSynthesisUtterance(data.source.split('#')[selectIndex]);
      utterance.voice = synth.getVoices()[selectedVoice];
      utterance.rate = selectedRate;
      utterance.pitch = selectedPitch;
      utterance.volume = selectedVolume;

      utterance.addEventListener('end', function () {
         let element = document.getElementById(`${selectIndex}`);
         if (element) {
            element.classList.remove('slect-voice');
         }

         window.speechSynthesis.cancel();

         toast.info('🦄 you are test Speak done', {
            position: "bottom-center",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
         });

      });

      synth.speak(utterance);
   }

   return (
      <div className="readercontent">
         {/*     <div className="bixbox hothome" >
            <div className="releases" >
               <h2 style={{minWidth:"100px"}}><i className='fa fa-hashtag'></i> Audio:</h2>
                  <p style={{paddingRight:"10px"}}><span style={{color:"#8d0ba3",paddingRight:"5px"}}>{data.nameDoc} {`${config.configSetting.lbl_text_chapter} ${data.idDetail}`}</span></p>

            </div>
            <div className="listupd" >
               <Grid container spacing={2}>
                  <Grid item sm={5} md={5} xs={12} style={{textAlign:"center"}}>
                     <Grid container spacing={0}>
                        <Grid item xs={12}>
                           <Typography gutterBottom>Click play reading {config.configSetting.lbl_text_chapter} {data.idDetail}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                           {play==false&& <a style={{ width: "124px ", height: "124px",backgroundColor:"rgb(239 97 5 / 53%)",display:"inline-block",borderRadius:"50%",padding:"5px",margin:"5px" }} onClick={()=>playSpeak()}><i className="fa fa-play" style={{fontSize:"100px",paddingLeft:"25px",paddingTop:"9px"}}></i></a>}
                              {play==true&& <a style={{ width: "124px ", height: "124px",backgroundColor:"rgb(239 97 5 / 53%)",display:"inline-block",borderRadius:"50%" ,padding:"5px",margin:"5px" }} onClick={()=>pauseSpeak()}><i className="fa fa-pause" style={{fontSize:"100px",paddingLeft:"0px",paddingTop:"9px"}}></i></a>}
                              {pause==true&& <a style={{ width: "124px ", height: "124px",backgroundColor:"rgb(239 97 5 / 53%)",display:"inline-block",borderRadius:"50%" ,padding:"5px",margin:"5px" }} onClick={()=>resumSpeak()}><i className="fa fa-undo" style={{fontSize:"100px",paddingLeft:"17px",paddingTop:"9px"}}></i></a>}

                              </Grid>
                     </Grid>
                  </Grid>
                  <Grid item sm={7} md={7} xs={12}>
                     <Grid container spacing={0}>
                        <Grid item xs={4}>
                           <p>Voice Speak</p>
                        </Grid>
                        <Grid item xs={8}>
                           <FormControl fullWidth  size="small">
                                 <select
                                    id="voice-select"
                                    value={`${selectedVoice}`}
                                    onChange={handleChangeVoiceSelect}
                                    variant="standard"
                                    label="Voice Speek"
                                    >
                                    
                                    {voices.map((voice,index)=>{
                                       return <MenuItem value={index} key={index}>{voice.name} ({voice.lang}) {voice.default && ' [Default]'}</MenuItem>
                                    })}
                                 </select>
                              </FormControl>
                        </Grid>
                     </Grid>
                     <Grid container spacing={0}>
                        <Grid item xs={4}>
                           <Typography gutterBottom>Volume Speak</Typography>
                        </Grid>
                        <Grid item xs={8}>
                           <FormControl fullWidth  size="small">
                              <Slider
                              size="small"
                                 aria-label="Volume Speak"
                                 value={selectedVolume}
                                 onChange={(event,value,thume)=>ChangeVoluneSpeak(value)}
                                 valueLabelDisplay="auto"
                                 step={0.1}
                                 marks
                                 min={0}
                                 max={1}
                              />
                              </FormControl>
                        </Grid>
                     </Grid>
                     <Grid container spacing={0}>
                        <Grid item xs={4}>
                           <Typography gutterBottom>Rate Speak</Typography>
                        </Grid>
                        <Grid item xs={8}>
                           <FormControl fullWidth  size="small">
                              <Slider
                                 aria-label="Rate Speak"
                                 size="small"
                                 value={selectedRate}
                                 onChange={(event,value,thume)=>ChangeRateSpeak(value)}
                                 valueLabelDisplay="auto"
                                 step={0.1}
                                 marks
                                 min={0}
                                 max={5}
                              />
                              </FormControl>
                        </Grid>
                     </Grid>
                     <Grid container spacing={0}>
                        <Grid item xs={4}>
                           <Typography gutterBottom>Pitch Speak</Typography>
                        </Grid>
                        <Grid item xs={8}>
                           <FormControl fullWidth  size="small">
                              <Slider
                                 aria-label="Pitch Speak"
                                 size="small"
                                 value={selectedPitch}
                                 onChange={(event,value,thume)=>ChangePitchSpeak(value)}
                                 valueLabelDisplay="auto"
                                 step={0.1}
                                 marks
                                 min={0}
                                 max={2}
                              />
                              </FormControl>
                        </Grid>
                     </Grid>
                     <Grid container spacing={0}>
                        <Grid item xs={4}>
                           <Typography gutterBottom>Auto Speak</Typography>
                        </Grid>
                        <Grid item xs={8}>
                        <Checkbox
                                 checked={autoSpeak}
                                 onChange={ChangeAutoSpeak}
                                 inputProps={{ 'aria-label': 'controlled' }}
                                 />
                              
                        </Grid>
                     </Grid>
                     <Grid container spacing={0}>
                        <Grid item xs={6}>
                           <a  onClick={()=>speakTest(1)}><i className="fa fa-bullhorn" aria-hidden="true"></i> Click Test config Speak</a>
                        </Grid>
                        <Grid item xs={6}>
                           <a  onClick={()=>reastartSpeak()}><i className="fa fa-undo" aria-hidden="true"></i> Click Restart Default</a>
                        
                        </Grid>
                     </Grid>
                  </Grid>
               </Grid>
            </div>
         </div> */}
         <div style={{ fontSize: `${fontSize}px`, lineHeight: lineHeight, ...(bgColor ? { backgroundColor: bgColor } : {}), ...(colorSelect ? { color: colorSelect } : {}), ...(fontFamilySelect ? { fontFamily: fontFamilySelect } : {}) }} >

            {data.source.split('#').map((c: any, k: number) => {

               return (
                  <>
                     {/*  {(k == 0) && <AdsBannerSpace />} */}
                     <a id={`${k}`} key={`${k}`}>
                        <p style={{ paddingLeft: "10px" }}>{c}</p>
                     </a>
                     {(k % 10 == 0) && <AdsViews />}
                     {/*    {(k % 10 == 0 && k != data.source.split('#').length - 1) && <AdsBannerTop />}
                    {(k == (data.source.split('#').length - 1)) && <VideoAds />} */}
                  </>
               )
            })}
         </div>
      </div>
   )
}
export default ContenView;
