import { FormData as FormDataType } from "../../../components/form/form";

export default function Historia({ data }: { data: FormDataType }) {
  console.log("data historia ", data);
  return (
    <>
      <span
        className="mth-data"
        style={{ display: "none" }}
        data-mth-campaign-name={data.campaignName}
        data-mth-campaign-id={data.campaignId}
        data-mth-creative-name={data.creativeName}
        data-mth-creative-id={data.creativeId}
      />
      <img id="mth-story-img" src={data.creativeFTP} alt="" />
      <p id="mth-story-text">{data.messageCreative}</p>
    </>
  );
}
