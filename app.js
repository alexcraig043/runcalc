function setup () {

    //Link js Variables to HTML Elements

    //Solve For:
    const SolveTime = document.getElementById('SolveTime')
    const SolveDistance = document.getElementById('SolveDistance')
    const SolvePace = document.getElementById('SolvePace')
    const SolveButton = document.getElementById('solveButton')

    //Time:
    let HoursTime = document.getElementById('HoursTime')
    let MinutesTime = document.getElementById('MinutesTime')
    let SecondsTime = document.getElementById('SecondsTime')

    let TimeSeconds = 0

    //Distance:
    let DistanceText = document.getElementById('DistanceText')
    let kmDistance = document.getElementById('kmDistance')
    let miDistance = document.getElementById('miDistance')
    let mDistance = document.getElementById('mDistance')
    

    let DistanceNumKm = 0
    let DistanceNum = 0

    //Pace Text Boxes:
    let HoursPace = document.getElementById('HoursPace')
    let MinutesPace = document.getElementById('MinutesPace')
    let SecondsPace = document.getElementById('SecondsPace')
    //Pace Radios:
    let kmPaceRadio = document.getElementById('kmPaceRadio')
    let miPaceRadio = document.getElementById('miPaceRadio')
    //Pace Custom Radio - TextBox - Select:
    let CustomPaceRadio = document.getElementById('CustomPaceRadio')
    let CustomPaceText = document.getElementById('CustomPaceText')
    let CustomPaceSelect = document.getElementById('CustomPaceSelect')


    let SecondsPerKm = 0
    let SecondsPerUnit = 0


    SolveButton.addEventListener('click', Initiate)


    function Initiate() {
        console.log('Solving...')
        checkSolve()
        
    }

    function checkSolve () {
        //Checks What Variable we Are Solving For

        if (SolveTime.checked) {
            console.log('Solving Time')
            Time()
            console.log('Done')

        } else if (SolveDistance.checked) {
            console.log('Solving Distance')
            Distance()
            console.log('Done')

        } else if (SolvePace.checked) {
            console.log('Solving Pace')
            Pace()
            console.log('Done')

        } else {
            console.log('Please Select Output')
        }

    }

    function Distance () {
        // Solves for Distance

        let DistanceToDisplay = 0

        TimeToSeconds(HoursPace, MinutesPace, SecondsPace)
        SecondsPerPace = TimeSeconds
        console.log(`SecondsPerPace is ${SecondsPerPace}`)

        TimeToSeconds(HoursTime, MinutesTime, SecondsTime)
        console.log(`Total Time is ${TimeSeconds}`)

        PacePerKm()
        
        // Distance = Total Time / SecondsPerKm

        DistanceToDisplay = TimeSeconds / SecondsPerKm

        ConvertDistanceToOutput()

        DistanceText.value = DistanceToDisplay
        
    }

    function ConvertDistanceToOutput () {

        // Converts Distance to Output Based on Checked Radio

        if (kmDistance.checked) {
            DistanceToDisplay = DistanceToDisplay
            console.log(`Distance is ${DistanceToDisplay} km`)

        } else if (miDistance.checked) {
            DistanceToDisplay = DistanceToDisplay * 0.621371
            console.log(`Distance is ${DistanceToDisplay} mi`)

        } else if (mDistance.checked) {
            DistanceToDisplay = DistanceToDisplay * 1000
            console.log(`Distance is ${DistanceToDisplay} m`)

        }

    }

    function Time () {
        // Solves for Time

        DistanceToKm(DistanceText.value)

        TimeToSeconds(HoursPace, MinutesPace, SecondsPace)

        SecondsPerPace = TimeSeconds

        console.log(`Total Pace is ${SecondsPerPace} Seconds`)

        PacePerKm()

        // Total Time = SecondsPerKm * Distance (in km)
            
        TimeToDisplay = SecondsPerKm * DistanceNumKm
        
        console.log(`Time in Seconds is ${TimeToDisplay} Seconds`)

        // Now lets pass TimeToDisplay into our time display algorithm
            
        DisplayTime(TimeToDisplay, HoursTime, MinutesTime, SecondsTime) 
               
    }

    function Pace () {
        // Solves for Pace

        TimeToSeconds(HoursTime, MinutesTime, SecondsTime)
        console.log(`Time in Seconds is ${TimeSeconds} Seconds`)
        
        DistanceToKm(DistanceText.value)
        console.log(`Distance in km is ${DistanceNumKm}`)
        
        PaceToOutput()
        
        SecondsPerUnit = TimeSeconds / DistanceNum

        DisplayTime(SecondsPerUnit, HoursPace, MinutesPace, SecondsPace) 

        function PaceToOutput () {
            
            if (kmPaceRadio.checked) {
                console.log('Solving Pace Per km')
                DistanceNum = DistanceNumKm
                
                
            } else if (miPaceRadio.checked) {
                console.log('Solving Pace Per mile')
                DistanceNum = DistanceNumKm / 1.60934 
                
    
            } else if (CustomPaceRadio.checked) {
                let CustomPaceNum = Number(CustomPaceText.value)
                
                if (CustomPaceSelect.value === 'Kilometers') {
                    console.log(`Solving Pace Per ${CustomPaceNum} km`)
                    DistanceNum = DistanceNumKm / CustomPaceNum
                    
    
                } else if (CustomPaceSelect.value === 'Miles') {
                    console.log(`Solving Pace Per ${CustomPaceNum} miles`)
                    DistanceNum = DistanceNumKm * 0.621371 / CustomPaceNum
                    
    
                } else if (CustomPaceSelect.value === 'Meters') {
                    console.log(`Solving Pace Per ${CustomPaceNum} meters`)
                    DistanceNum = DistanceNumKm * 1000 / CustomPaceNum
                    
                    
                }
            }

        }
    }

    function TimeToSeconds (Hours, Minutes, Seconds) {
        // Finds Total Time of Input in Seconds

        let HoursNum = Number(Hours.value) * 3600
        let MinutesNum = Number(Minutes.value) * 60
        let SecondsNum = Number(Seconds.value)
        
        
        console.log(`${HoursNum / 3600} Hours`)
        console.log(`${MinutesNum / 60} Minutes`)
        console.log(`${SecondsNum} Seconds`)
        
        TimeSeconds = HoursNum + MinutesNum + SecondsNum
        
    }
    
    function PacePerKm () {
        // Finds Seconds Per km
        
        if (kmPaceRadio.checked) {
            SecondsPerKm = SecondsPerPace
            
        } else if (miPaceRadio.checked) {
            SecondsPerKm = SecondsPerPace / 1.60934 

        } else if (CustomPaceRadio.checked) {
            let CustomPaceNum = Number(CustomPaceText.value)

            if (CustomPaceSelect.value === 'Kilometers') {
                console.log(`CustomPaceNum is ${CustomPaceNum}`)
                SecondsPerKm = SecondsPerPace / CustomPaceNum

            } else if (CustomPaceSelect.value === 'Miles') {
                CustomPaceNum = CustomPaceNum / 0.621371
                console.log(`CustomPaceNum is ${CustomPaceNum}`)
                SecondsPerKm = SecondsPerPace / CustomPaceNum
            
            } else if (CustomPaceSelect.value === 'Meters') {
                CustomPaceNum = CustomPaceNum / 1000
                console.log(`CustomPaceNum is ${CustomPaceNum}`)
                SecondsPerKm = SecondsPerPace / CustomPaceNum

            }

        }
        
        console.log(`SecondsPerKm is ${SecondsPerKm}`)
        
    }

    function DisplayTime(Time, Hours, Minutes, Seconds) {
        // Displays TimeSeconds in Hours, Minutes, and Seconds
        
        console.log(`Going to Display ${Time} Seconds`)
        
        let HoursOutput = Math.floor(Time / 3600)
        let MinutesOutput = Math.floor(60 * ((Time / 3600) - HoursOutput))
        let SecondsOutput = Time - MinutesOutput * 60 - HoursOutput * 3600
        
        console.log(`${HoursOutput} Hours ${MinutesOutput} Minutes ${SecondsOutput} Seconds`)

        Hours.value = HoursOutput
        Minutes.value = MinutesOutput
        Seconds.value= SecondsOutput
        
    }

    function DistanceToKm (dist) {
            // Converts Distance Input to Kilometers
    
            DistanceNumKm = Number(dist)
    
            if (kmDistance.checked) {
                console.log('Distance Input Unit is Kilometers')
            } else if (miDistance.checked) {
                console.log('Distance Input Unit is Miles')
                DistanceNumKm = DistanceNumKm * 1.60934
            } else if (mDistance.checked) {
                console.log('Distance Input Unit is Meters')
                DistanceNumKm = DistanceNumKm / 1000
            }

            console.log(`DistanceNumKm is ${DistanceNumKm}`)
    
    }

}
