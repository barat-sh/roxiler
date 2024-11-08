
// eslint-disable-next-line react/prop-types
const Statistics = ({ statistics }) => {
    return (
        <main>
        {
            statistics &&
            (Object.keys(statistics).map(entry => (
                <h4 className="m-2 text-xl" key={entry}>{entry}: {statistics[entry]}</h4>
            )))
        }
        </main>
    )
}

export default Statistics;