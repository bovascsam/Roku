import { useEffect, useState } from 'react';
import API from '@aws-amplify/api';
import Form from '../formUI/form';
import { _ShortVideos } from '../formUI/formProps';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Button,Grid } from '@mui/material';

const select_basic = (state) => state._basic;
const select_shortvideocount = (state) => state.shortVideoCount;


function ShortVideos() {
    const _basicInSV = useSelector(select_basic);
    const _shortVideoCountInSV = useSelector(select_shortvideocount);
    const [_basic, setbasic] = useState(_basicInSV);
    const [shortVideoCount, setshortVideoCount] = useState(_shortVideoCountInSV != undefined ? _shortVideoCountInSV : [<Form tabname="shortFormVideos" formprops={_ShortVideos} index={0} handleChange={(e) => handleChange(e)} />]);
    const dispatch = useDispatch()
    
    const AddFormElement = () => {
        let tempbasic = _basic;
        let shortvideos = _basic.shortFormVideos != undefined ? _basic.shortFormVideos : [{ "id": "" }];
        let tempform = <></>
        tempform = <Form tabname="shortFormVideos" formprops={_ShortVideos} index={shortVideoCount.length} handleChange={(e) => handleChange(e)} />
        //tempform.push(<Form formprops={_ShortVideos} index={tempform.length+1} handleChange={(e) => handleChange(e)} />)
        setshortVideoCount([...shortVideoCount, tempform]);        
        dispatch({ type: 'shortVideoCount/_shortVideoCountChanged', payload: shortVideoCount });
        shortvideos.push({ "id": "" });
        setbasic({ ..._basic, shortFormVideos: shortvideos });
        tempbasic["shortFormVideos"] = shortvideos;
        dispatch({ type: '_basic/_basicChanged', payload: tempbasic })
    }
    const handleChange = (event, key) => {
        let tempbasic = _basic;
        let indexcount = event["index"]
        let objidentifier=event["objidentifier"]
        let shortvideos = _basic.shortFormVideos != undefined ? _basic.shortFormVideos : [{ "id": "" }];
        switch (event.target.name) {
            case "content":
                if(shortvideos[indexcount]["content"]== undefined){
                    shortvideos[indexcount]["content"]={};
                }
                shortvideos[indexcount]["content"][objidentifier] = event.target.value;
                break;
            case "videocontent":
                if(shortvideos[indexcount]["content"]["videos"]== undefined){
                    shortvideos[indexcount]["content"]["videos"]=[{"videoType":"","url":"","quality":""}];
                }
                shortvideos[indexcount]["content"]["videos"][0][objidentifier] = event.target.value

                break;
            default:
                shortvideos[indexcount][objidentifier] = event.target.value;
                break;
        }
        setbasic({ ..._basic, shortFormVideos: shortvideos });
        tempbasic["shortFormVideos"] = shortvideos;
        dispatch({ type: '_basic/_basicChanged', payload: tempbasic })
    }

    return (
        <Grid container className="Basic" spacing={1}>
            <Grid item xs={10} md={12} lg={12}>
                <Button onClick={AddFormElement}>Add Short Video</Button>
            </Grid>
            <Grid item xs={10} md={8} lg={8}>
            {
                shortVideoCount.map((form, index) => {
                    return (form);
                })
            }
            </Grid>
            <Grid item xs={12} md={2} lg={2}>
                <p>{JSON.stringify(_basic)}</p>
            </Grid>
        </Grid>
    );
}

export default ShortVideos;