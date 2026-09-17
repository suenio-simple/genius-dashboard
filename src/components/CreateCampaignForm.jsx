const CreateCampaignForm = ({ toggleModal }) => {
  return (
    <div className="overlay" onClick={toggleModal}>
      <article
        className="create-campaign-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button onClick={toggleModal}>x</button>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nam sequi
        hic inventore, facilis ut saepe exercitationem culpa. Quibusdam
        eligendi, officiis ex ducimus fuga corrupti harum accusamus maxime
        expedita id?
      </article>
    </div>
  );
}

export default CreateCampaignForm