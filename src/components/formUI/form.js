import * as React from 'react';
import { Box, Grid, Button } from '@mui/material';
import TextField from '@mui/material/TextField';

import { useSelector } from 'react-redux'

const select_basic = (state) => state._basic;
const select_shortvideocount = (state) => state.shortVideoCount;
let statictabname = "";
function CreateDomElements(props) {
    const { element, index, handleChange } = props;
    const _basic = useSelector(select_basic);
    // console.log("CreateDomElements ---------- ",element)
    return (
        <div>
            {
                element.multipleItems == true ?
                    element.hassubELements == true ?
                        <>
                            <RenderHeader element={element} />
                            {
                                element.subElements.map(sub => {
                                    return (<CreateDomElements element={sub} index={index} handleChange={(e) => { /*e["objidentifier"] = sub.key;debugger; console.log("e['objidentifier'] = sub.key",e["objidentifier"]); e["index"] = index;*/ handleChange(e) }} />)

                                })
                            }
                        </> : null
                    :
                    <RenderSwitch element={element} index={index} handleChange={(e) => { e["objidentifier"] = element.key; debugger; console.log("e['objidentifier'] = element.key", e["objidentifier"]); e["index"] = index; handleChange(e) }} />
            }
        </div>
    );

}
function RenderSwitch(props) {
    const { element, index, handleChange } = props;
    const _basic = useSelector(select_basic);
    // console.log("RenderSwitch ---------- ",element)
    let defaultvaule = "";
    if (element.keyidentifier) {
        switch (element.keyidentifier) {
            case "content":
                defaultvaule = statictabname === "" ? _basic[element.key] : _basic[statictabname] != undefined ? _basic[statictabname][index]["content"][element.key] : "";
                break;
            case "videocontent":
                defaultvaule = statictabname === "" ? _basic[element.key] : _basic[statictabname] != undefined ? _basic[statictabname][index]["content"]["videos"][0][element.key] : "";
                break;
            default:
                defaultvaule = statictabname === "" ? _basic[element.key] : _basic[statictabname] != undefined ? _basic[statictabname][index][element.key] : "";
                break;
        }
    }
    else{
        defaultvaule = statictabname === "" ? _basic[element.key] : _basic[statictabname] != undefined ? _basic[statictabname][index][element.key] : "";
    }

    switch (element.type) {
        case "text":
            return (
                <div>
                    <TextField
                        key={`sv${index}`}
                        required={element.required}
                        label={element.label}
                        defaultValue={defaultvaule}
                        placeholder={element.defaultValue}
                        variant="filled"
                        InputProps={{ name: element.keyidentifier ? element.keyidentifier : element.key }}
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                    />
                </div>
            );

        case "multiline":
            return (
                <div>
                    <TextField
                        key={`sv${index}`}
                        id="filled-multiline-static"
                        label={element.label}
                        multiline
                        rows={4}
                        defaultValue={defaultvaule}
                        variant="filled"
                        InputProps={{ name: element.keyidentifier ? element.keyidentifier : element.key, keyname: element.key }}
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                    />
                </div>
            );
    }
}
function RenderHeader(props) {
    const { element, index, handleChange } = props;
    const _basic = useSelector(select_basic);
    switch (element.subElementHeader.type) {
        case "Button":
            return (
                <div>
                    <Button>{element.subElementHeader.headerText}</Button>
                </div>
            );
        case "Text":
            return (
                <div>
                    <p>{element.subElementHeader.headerText}</p>
                </div>
            );
    }
}
export default function Form(props) {
    const { tabname, formprops, index, handleChange } = props;
    statictabname = props.tabname;
    return (


        <Grid container spacing={1}>
            {
                formprops.map((element, index) => {
                    return (
                        <Grid item lg={5} md={5}>
                            <CreateDomElements element={element} index={props.index} handleChange={handleChange} />
                        </Grid>

                    )

                })
            }
        </Grid>





    );
}
