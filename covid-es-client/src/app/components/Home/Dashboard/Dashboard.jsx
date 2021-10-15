import React from 'react'
import maledoctor from '../../../../assets/male-doctor.svg'
import femaledoctor from '../../../../assets/woman-doctor.svg'
export default function Dashboard() {
    return (
        <><div>
            <div className="card" style={{ width: "18rem" }}>
                <img className="card-img-top" src={maledoctor} alt="Card image cap" />
                <div className="card-body">
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
            <div className="card" style={{ width: "18rem" }}>
                <img className="card-img-top" src={femaledoctor} alt="Card image cap" />
                <div className="card-body">
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
            <div className="card" style={{ width: "18rem" }}>
                <img className="card-img-top" src={maledoctor} alt="Card image cap" />
                <div className="card-body">
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
        </div><form>
                <div class="mb-3">
                    <label for="InputName" class="form-label">Symptom: </label>
                    <input type="text" class="form-control" id="InputName" aria-describedby="emailHelp" width />
                    <div id="emailHelp" class="form-text"></div>
                </div>

                <div class="mb-3 form-check">
                   <input type="checkbox" class="form-check-input" id="dizziness"/>
                    <label class="form-check-label" for="exampleCheck1">Covid</label>
                </div>

                <div class="mb-3 form-check">
                   <input type="checkbox" class="form-check-input" id="dizziness"/>
                    <label class="form-check-label" for="exampleCheck1">Mu Variant</label>
                </div>

                <div class="mb-3 form-check">
                   <input type="checkbox" class="form-check-input" id="dizziness"/>
                    <label class="form-check-label" for="exampleCheck1">delta</label>
                </div>
            </form></>
    )
}
