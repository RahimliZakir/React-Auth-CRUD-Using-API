import "../../assets/css/image-input.css";

import ImageInputDefault from "../../assets/images/image-input-default.png";

const ImageInput = ({ registerFunction }) => {
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
        style={{ backgroundImage: `url(${ImageInputDefault})` }}
      >
        <input type="hidden" name="FileTemp" />
        <span>&times;</span>
      </label>
      <input
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
