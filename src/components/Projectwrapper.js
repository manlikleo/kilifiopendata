import React,{useContext,useEffect,useState} from 'react';
import '../css/styles.min.css';
import '../css/project.min.css';
import { FilterContext } from '../FilterContext';
import Piechart from '../components/Piechart';
import ProjctHeader from '../components/Projectheader';
import ProjectSum from './ProjectSum';
import BarChart from './BarChart';

const Barsize = () => {

    const mobileSize = window.matchMedia("(max-width: 425px)")
    let bartick = {};
    if (mobileSize.matches){
        bartick = {
            autoSkip: false,
            maxRotation: 90,
            minRotation: 90,
            fontSize:10,
            fontStyle:900,
            fontColor:'#2B622A'
    }
       
    }else{
        bartick = {
            autoSkip: true,
            maxRotation: 0,
            minRotation: 0,
            fontSize:6.55,
            fontStyle:900,
            fontColor:'#2B622A'
        }
       
    }
    return bartick

}



const ProjectWrapper = () => {

    const [barParams, setBarParams] = useState(Barsize());

    const {compdata,proTypeData,ProPhase,ProStatus} = useContext(FilterContext);
    const [currentComp,deptComp,communityPop,projectStats]= compdata;
    const [projType,proLabel] = proTypeData;
    const [phasedata,phaselabel] = ProPhase
    const [projStatusLabel,projStatusData,statusComp] = ProStatus;

    useEffect(() => {
        
        function reSize(){
            setBarParams(Barsize());
        }

        window.addEventListener('resize', reSize)

        return _ => {
            window.removeEventListener('resize', reSize)
          
      }
        
    })

    console.log(barParams);



    const projectSummary = {
        summaryName: 'Total Projects',
        sumText: 'Includes completed, ongoing and proposed projects',
    }
    projectSummary.sumValue = deptComp.length === 0 ? projectStats.projectNumber : deptComp.total


    const statusSummary = {
        summaryName:`Total Projects in ${currentComp.name}`,
        sumValue: projectStats.projectNumber,
        sumText: 'Includes completed, ongoing and proposed projects'
    }

    const statusProjects = {
        summaryName:`Total ${statusComp.title} projects in ${currentComp.name}`,
        sumValue: statusComp.count,
        sumText: `Includes all ${statusComp.title} projects`
    }

    const statusperc = {
        summaryName:`% of ${statusComp.title} projects in ${currentComp.name}`,
        sumValue: `${statusComp.percentage}%`,
        sumText: `Includes all ${statusComp.title} project rates in ${currentComp.name}`
    }


    const projectType = {
        labels:proLabel ,
        datasets:[
            {
                label: 'Projects',
                backgroundColor:[
                    '#90CBA9',
                    '#EBA10F',
                    '#2B87E3',
                    '#9B51E0',
                    '#6042E4',
                    '#E029D1',
                    '#184E2D',
                    '#EF0E4D',
                    '#FCE842',
                    '#3C4B97'

                ],
                hoverBackgroundColor:[
                    '#90CBA9',
                    '#EBA10F',
                    '#2B87E3',
                    '#9B51E0',
                    '#6042E4',
                    '#E029D1',
                    '#184E2D',
                    '#EF0E4D',
                    '#FCE842',
                    '#3C4B97',

                ],
                data:projType
            }
        ]   
    }

    const projectComp = {

        labels: phaselabel,
        datasets:[
            {
                label: 'Projects',
                backgroundColor:[
                    '#90CBA9',
                    '#EBA10F',
                    '#2B87E3',
                ],
                hoverBackgroundColor:[
                    '#90CBA9',
                    '#EBA10F',
                    '#2B87E3',
                ],
                data:phasedata
            }
        ] 

    }


    const state = {
        labels: projStatusLabel,
        datasets:[{
            label:'Project Status',
            backgroundColor:'#6FCF97',
            data:projStatusData,
            datalabels: {
                align: 'end',
                anchor: 'end',
                clamp:true,
                color: '#000',
                offset:0.5,
                formatter: function(value, context) {
                    return  value.toFixed(0) +  '%';
                },
                clip:false,
                
              }
        }]
    }

    


    
    return (
       
        <div className="project__wrapper">
             {/* {BarThickness} */}
                <ProjctHeader/>

                <div className="project__infowrapper">

                {statusComp.length === 0 ? (

                    <div className="project__infostep">

                        <ProjectSum data={projectSummary}/>

                        <div className="project__pie">
                            <p className="project__sumtitle">Based on Project Status</p>

                            <div className="project__bar">
                                <BarChart state={state} bartick={barParams}/> 
                            </div>

                        </div>
                    
                    </div> 


                ) : ( 

                    <div className="project__infostep">

                        <ProjectSum data={statusSummary}/>
                        <ProjectSum data={statusProjects}/>
                        <ProjectSum data={statusperc}/>

                    </div> 


                )}

                    



                    <hr/>

                    <div className="project__infostep">

                        <div className="project__pie ">
                                <p className="project__sumtitle margin-bottom">Based on Project Execution Phase</p>
                                <Piechart state={projectComp} height={150} width={300}/>
                        </div>

                        <div className="project__pie project__bar">
                                <p className="project__sumtitle">Based on Project Department</p>
                                <Piechart state={projectType} height={300} width={600}/>
                        </div>
                        
                    </div> 
            
                </div>

            </div>

    );


};

export default ProjectWrapper; 