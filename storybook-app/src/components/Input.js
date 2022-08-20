import React from 'react'
import { bool, string } from 'prop-types';
import "./Input.css";

const Input = React.forwardRef(({
  id,
  label,
  placeholder,
  readonly,
  disabled,
  error,
  ...other
}, ref) => {
  return (
    <dev>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        readOnly={readonly}
        disabled={disabled}
        {...other}
        ref={ref}
      />
      {error && <div className='error'>{error}</div>}

    </dev>
  )
});

export default Input;

Input.propTypes = {
  /** 아이디 */
  id: string.isRequired,
  /** 레이블 */
  label: string.isRequired,
  /** 플레이스홀더 */
  placeholder: string,
  /** 읽기전용 상태 */
  readonly: bool,
  /** 비활성화 상태 */
  disabled: bool,
  /** 에러 메시지 */
  error: string
}
