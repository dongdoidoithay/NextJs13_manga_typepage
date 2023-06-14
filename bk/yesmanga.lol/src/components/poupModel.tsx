const ModelPopup=(state:boolean)=>{
    return (      
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75">
    <div className="relative mx-auto max-w-lg mt-20">
      <div className="bg-white rounded-lg px-4 py-3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Modal Title</h2>
          <button className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10.707 10L16 15.293l1.414-1.414L12.12 8.88l4.294-4.293L16 3.707 10.707 9l-4-4-1.414 1.414L8.293 10l-4 4 1.414 1.414L6.707 11l4 4z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <p className="text-gray-700 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel
          lorem non metus vulputate pellentesque nec eget dolor. Sed
          malesuada, sapien eget scelerisque dictum, elit nunc bibendum
          sapien, vel blandit sapien tortor sit amet enim. In sed magna at
          turpis venenatis elementum.
        </p>
        <div className="flex justify-end">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
            Save
          </button>
          <button className="text-gray-500 hover:text-gray-700 font-bold py-2 px-4 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>)
}
export default ModelPopup;