import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';

import BasicDetails from '../basic/basicDetails';
import ShortVideos from '../shortVideos/shortVideos';



const TabElements = ["Basic", "Live feed", "Short Videos", "Movies", "Series"];
const Components = [<BasicDetails />, <></>, <ShortVideos />]

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other} >
            {value === index && (
                <Grid item md={10} spacing={1} >
                    {children}
                </Grid>
            )}
        </div>

    );
}

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function VerticalTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Grid container spacing={2}>

            <Grid item md={2}>
                <Tabs
                    className='tabWrapper'
                    orientation="vertical"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    {
                        TabElements.map((tab, index) => {
                            return (
                                <Tab label={tab} {...a11yProps(index)} />
                            )
                        })
                    }
                </Tabs>
            </Grid>

            <Grid item md={10}>
                {
                    Components.map((component, index) => {
                        return (

                            <TabPanel value={value} index={index} >
                                {component}
                            </TabPanel>

                        )
                    })
                }
            </Grid>



        </Grid>
    );
}
