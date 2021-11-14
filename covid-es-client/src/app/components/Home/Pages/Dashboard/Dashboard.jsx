import React from 'react'
import maledoctor from '../../../../../assets/male-doctor.svg'
import femaledoctor from '../../../../../assets/female-nurse.svg'
import statisticsSectionIcon from '../../../../../assets/statisticsSection.svg'
import patientDiagnosisSectionIcon from '../../../../../assets/patientDiagnosisSectionIcon.svg'
import factsIcon from '../../../../../assets/factsIcon.svg'
import Card from '../../Card/Card'
import './Dashboard.css'
import SectionCard from '../../SectionCard/SectionCard'

// Dashboard page to display landing views. 
// Card componet used to show admins on the page.
// SectionCard component used to show sections of interes on the system.
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
                        Bio="UTech Final Year"
                    />
                    <Card
                        Name={"Brianna Perkins"}
                        Icon={femaledoctor}
                        Initials={"BP"}
                        Bio="UTech Final Year"
                    />
                    <Card
                        Name={"Matthew Ruddock"}
                        Icon={maledoctor}
                        Initials={"MR"}
                        Bio="UTech Final Year"
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
