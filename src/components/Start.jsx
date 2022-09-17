

export default function Start({startQuiz})
{
    return(<div className='start-container'>
        <h1 className='start-container-title'>Quizzical</h1>
        <h2 className='start-container-subtitle'>Are you sure?</h2>
        <button className='start-container-button' onClick={startQuiz}>Start Quiz</button>
    </div>)
}