const About = () => {
  return (
    <div className="my-5 italic text-left">
      <h6>Key Features:</h6>
      <ul className="list-disc">
        <li>{"SSR: <Home /> Component is SRR"}</li>
        <li>
          Server Actions: CRUD operations are performed using server actions
        </li>
        <li>{"zod: Server side form validation using zod"}</li>
        <li>
          {"Rebuild component using redirect('/') and revalidatePath('/')"}
        </li>
      </ul>
    </div>
  );
};

export default About;
