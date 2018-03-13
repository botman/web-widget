import { h, Component } from 'preact';

export default class ArrowIcon extends Component<IArrowIconProps, any> {

    render({ isOpened }: IArrowIconProps,{}) {
        return (
            <div>
                <img style={{
                    marginRight: 15,
                    marginTop: 6,
                    verticalAlign: 'middle'
                    }}
                    src={isOpened ? 'assets/img/close.svg' : 'assets/img/minimize.svg'}
                />
            </div>
        );
    }
}

interface IArrowIconProps {
    isOpened: boolean
}