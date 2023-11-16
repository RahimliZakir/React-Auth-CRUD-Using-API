import "../../assets/css/image-input.css";

import ImageInputDefault from "../../assets/images/image-input-default.png";

const ImageInput = ({ registerFunction, item }) => {
  const onChange = (e) => {
    const { files } = e.target;

    if (!files) return;

    const file = files[0];
    const imageInputLabel = document.querySelector(".image-input");
    const fileReader = new FileReader();
    fileReader.onload = () => {
      imageInputLabel.style.backgroundImage = `url(${fileReader.result})`;
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <div>
      <label className="control-label">Photo</label>
      <label
        className="image-input"
        htmlFor="File"
        style={{
          backgroundImage: `url(${
            Object.values(item).length > 0 ? item?.imagePath : ImageInputDefault
          })`,
        }}
      >
        <input {...registerFunction("fileTemp")} type="hidden" />
        <span>&times;</span>
      </label>
      <input
        // Old way ↓
        // onChange={handleFile}
        {...registerFunction("file", {
          onChange,
        })}
        id="File"
        type="file"
        accept="image/x-png,image/gif,image/jpeg"
      />
    </div>
  );
};

export default ImageInput;
