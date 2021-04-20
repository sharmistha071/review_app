import { useEffect, useState } from "react";
import "./styles.css";

export default function Form({ setIsFormRender, isFormRender, baseUrl }) {
  const [divisions, setDivisions] = useState([])
  const [selectedDivision, setSelectedDivision] = useState('')
  const [districts, setDistricts] = useState([])
  const [selectedDistrict, setSelectedDistrict] = useState('')
  
  const [policeStations, setPoliceStations] = useState([])
  const [selectedPoliceStation, setSelectedPoliceStation] = useState('')
  const [institutions, setInstitutions] = useState([])
  const [selectedInstitution, setSelectedInstitution] = useState('')

  const [rating, setRating]= useState(null)
  const [description, setDescription] = useState('')
  const [servicePerson, setServicePerson] = useState('')
  const [spDesignation, setSpDesignation] = useState('')
  const [isBribeTaken, setIsBribeTaken] = useState(false)
  const [bribeAmount, setBribeAmount] = useState(null)

  const handleSubmitButton = () => {
    setIsFormRender(!isFormRender);
    let postData = {
      "department":selectedInstitution,
      "rating":rating,
      "description": description,
      "service_person": servicePerson,
      "service_person_designation": spDesignation,
      "bribe_amount": bribeAmount
      }
      console.log('postData.....', postData)
      fetch(`${baseUrl}api/v1/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer', 
        body: JSON.stringify(postData)
      }).then((response)=>console.log('post created....', response))
  };

  const handleChange = (event, type) =>{
    if(type === 'division'){
      setSelectedDivision(event.target.value)
    }else if(type ==='district'){
      setSelectedDistrict(event.target.value)
    }else if(type ==='policeStation'){
      setSelectedPoliceStation(event.target.value)
    }else if(type ==='institution'){
      setSelectedInstitution(event.target.value)
    }
  }

  // call division endpoint
  useEffect(() => {
    fetch(`${baseUrl}api/v1/division`).then((response) =>
     response.json()
    ).then((data)=>{
      console.log('division....', data)
      setDivisions(data)
    });
  }, []);

  // call district  endpoint id selectedDivision change
  useEffect(()=>{
    fetch(`${baseUrl}api/v1/district?division=${selectedDivision}`).then((response) =>
    response.json()
   ).then((data)=>{
     console.log('district....', data)
     setDistricts(data)
   });
  }, [selectedDivision])

  // call polish station  endpoint id selectedDistrict change
  useEffect(()=>{
    fetch(`${baseUrl}api/v1/institute?police-station=${selectedDistrict}`).then((response) =>
    response.json()
   ).then((data)=>{
     console.log('police station....', data)
     setPoliceStations(data)
   });
  }, [selectedDistrict])

  // call institutions endpoint if selectedPoliceStation change
  useEffect(()=>{
    fetch(`${baseUrl}api/v1/department?institute=${selectedPoliceStation}`).then((response) =>
    response.json()
   ).then((data)=>{
     console.log('institution....', data)
     setInstitutions(data)
   });
  }, [selectedPoliceStation])


  return (
    <div className="card">
      <label for="division">Division</label>
      <select id="division" name="division" onChange={(event)=>handleChange(event, 'division')}>
        <option value="" disabled selected>Please select one...</option>
        {divisions.map((division)=><option index={division.id} value={division.id}>{division.name}</option>)}
      </select>

      <label for="district">District</label>
      <select id="district" name="district" onChange={(event)=>handleChange(event, 'district')}>
        <option value="" disabled selected>Please select one...</option>
        {districts.map((district)=><option index={district.id} value={district.id}>{district.name}</option>)}
      </select>

      <label for="policeStation">Police Station</label>
      <select id="policeStation" name="policeStation" onChange={(event)=>handleChange(event, 'policeStation')}> 
        <option value="" disabled selected>Please select one...</option>
        {policeStations.map((policeStation)=><option index={policeStation.id} value={policeStation.id}>{policeStation.name}</option>)}
      </select>

      <label for="institution">Institution</label>
      <select id="institution" name="institution" onChange={(event)=>handleChange(event, 'institution')}>
        <option value="" disabled selected>Please select one...</option>
        {institutions.map((institution)=><option index={institution.id} value={institution.id}>{institution.name}</option>)}
      </select>

      <label for="fname">Rating</label>
      <input type="number" name="rating" placeholder="Rating" max={5} min={0} onChange={(event)=>setRating(event.target.value)}/>

      <label for="description">Description</label>
      <textarea
        type="text"
        id="description"
        name="description"
        rows="5"
        onChange={(event)=>setDescription(event.target.value)}
      />

      <label for="servicePerson">Service Person</label>
      <input
        type="text"
        id="servicePerson"
        name="servicePerson"
        placeholder="Service Person.."
        onChange={(event)=>setServicePerson(event.target.value)}
      />

      <label for="spDesignation">Service Person Designation</label>
      <input
        type="text"
        id="spDesignation"
        name="spDesignation"
        placeholder="Service Person Designation.."
        onChange={(event)=>setSpDesignation(event.target.value)}
      />

      <div className="checkbox">
        <input type="checkbox" id="isBribe" name="isBribe" value={isBribeTaken} onChange={(event)=>setIsBribeTaken(event.target.value)} />
        <label for="isBribe"> Is bribe given? </label>
      </div>

      <label for="bribeAmount">Bribe Amount</label>
      <input type="number" name="bribeAmount" placeholder="Bribe Amount.." onChange={(event)=>setBribeAmount(event.target.value)}/>

      <input type="submit" value="Submit" onClick={handleSubmitButton} />
    </div>
  );
}
