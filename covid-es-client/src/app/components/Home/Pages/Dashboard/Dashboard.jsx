import React from 'react'
import maledoctor from '../../../../../assets/male-doctor.svg'
import femaledoctor from '../../../../../assets/female-nurse.svg'
import statisticsSectionIcon from '../../../../../assets/statisticsSection.svg'
import patientDiagnosisSectionIcon from '../../../../../assets/patientDiagnosisSectionIcon.svg'
import factsIcon from '../../../../../assets/factsIcon.svg'
import Card from '../../Card/Card'
import './Dashboard.css'
import SectionCard from '../../SectionCard/SectionCard'

export default function Dashboard() {
    return (
        <div className="dashboard-container">
            <div className="dashboard-container-header">Team Members</div>
            <div className="dashboard-container-content">
                <div className="content-cards">
                    <Card 
                        Name={"Gregory Woolery"}
                        Icon={maledoctor}
                        Initials={"GW"}
                    />
                    <Card
                        Name={"Brianna Perkins"}
                        Icon={femaledoctor}
                        Initials={"BP"}
                    />
                    <Card
                        Name={"Matthew Ruddock"}
                        Icon={maledoctor}
                        Initials={"MR"}
                    />
                </div>
                <div className="dashboard-container-about">
                    <div className="dashboard-container-header">What you'll see...</div>
                    <div className="section-cards">
                        <SectionCard 
                            Title={"Statistics"}
                            Icon={statisticsSectionIcon}
                        />
                        <SectionCard 
                            Title={"Patient Diagnosis"}
                            Icon={patientDiagnosisSectionIcon}
                        />
                        <SectionCard 
                            Title={"COVID-19 Facts"}
                            Icon={factsIcon}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}
