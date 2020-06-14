import styled from 'styled-components';

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  min-width: 185px;
`;

export const InputField = styled.input`
padding: 8px 4px;
font-weight:${(props) => props.theme.weight.regular}
font-size: 16px;
border-radius: 3px;
border-style: solid;
border-width: 1px;
// border-bottom:2px solid transparent;
height: 32px;
line-height: 20px;

width: ${(props) => props.width || '100%'};
padding: 4px 8px;
transition: all .2s ease;
outline:none;

&:focus, &:hover {
outline:none;
border-bottom:2px solid ${(props) => props.theme.colors.primary}
transition: all .2s ease;

}

@media (max-width: 480px) {
  padding: 8px 10px;
}

`;

export const Label = styled.div`
  color: ${(props) => props.theme.colors.gray};
  font-size: 14px;

  height: 20px;
  line-height: 20px;
  margin-bottom: 4px;
  text-align: left;
  width: 100%;
`;

export const Error = styled.div`
  color: ${(props) => props.theme.colors.error};
`;
