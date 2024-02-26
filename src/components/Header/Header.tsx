import './header.css'

export default function Header() {
  return <div className='header-container'>
    <div className="btn-container">
      <button>add order +</button>
    </div>
    <div className="inputs-container">
      <input type="text" placeholder='free text' />
      <input type="datetime" name="" id="" placeholder='01/02/2024' />
      <select name="" aria-placeholder='filter' id=""></select>
    </div>
  </div>
}