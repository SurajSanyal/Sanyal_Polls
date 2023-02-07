const AddPoll = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    // @todo add poll to store
    console.log(formJson);
  };

  return (
    <div>
      <div>Would You Rather...</div>
      <form onSubmit={handleSubmit}>
        <div>
          <div>Option One</div>
          <input name="optionOne" type="text" placeholder="Option One" />
        </div>

        <div>
          <div>Option Two</div>
          <input name="optionTwo" type="text" placeholder="Option Two" />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddPoll;
