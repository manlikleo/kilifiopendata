import React from 'react';
import '../css/styles.min.css';
import '../css/project.min.css';
import Piechart from '../components/Piechart';
import ProjectTitle from './ProjectTitle';
import ProjectSum from './ProjectSum';




const Citizen = () => {



    const projectComp = {

        labels: ['County', 'Private Sector','County Budget','Others(NGOS, CBOs,FBOs)'],
        datasets:[
            {
                label: 'Projects',
                backgroundColor:[
                    '#90CBA9',
                    '#EBA10F',
                    '#2B87E3',
                    '#9B51E0',
                ],
                hoverBackgroundColor:[
                    '#90CBA9',
                    '#EBA10F',
                    '#2B87E3',
                    '#9B51E0',
                ],
                data: [140,80,80,60]
            }
        ] 

    }

    const projectSummary = {
        summaryName: 'Total Funds Spent(KES)',
        sumValue: '75.6 Billion',
        sumText: 'Includes funds from other sources',
    }



    const Title = {
        Name : 'Citizen Priorities'
    }


    return (

        <div className="project__wrapper">

            <ProjectTitle title={Title}/>

                <div className="project__infowrapper">

                        <div className="project__infostep">
                            <ProjectSum data={projectSummary}/>

                            <div className="project__pie">
                                <p className="project__sumtitle">Based on Source of funding</p>
                                <Piechart state={projectComp}/>
                            </div>

                            <div className="project__pie">
                                <p className="project__sumtitle">Based on Source of funding</p>
                                <Piechart state={projectComp}/>
                            </div>

                        </div>  

                    <hr/>

                </div>

        </div>

    );


};

export default Citizen; 