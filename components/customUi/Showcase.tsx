import LinkBtn from "../utility/LinkBtn"


const Showcase = () => {
  return (
    <section className="w-full max-w-7xl px-3  text-center py-16 flex flex-col gap-8">
        <div className="text-4xl leading-relaxed text-center font-medium text-slate-900 flex flex-col gap-3">
          <h1>Turn your to-do list🧾 into a 
          </h1>
          <h1>trophy🏆 case🔥</h1>
        </div>
        
        <div className="pt-8">
            <LinkBtn name={"Plan and Win 10 points  🎉"} disabled = {false} submissionType={undefined}  route={"/dashboard/streaks"} />
        </div>
    </section>
  )
}

export default Showcase