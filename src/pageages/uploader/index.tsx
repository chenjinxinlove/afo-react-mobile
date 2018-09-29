import classnames from 'classnames';
import * as React from 'react';
import { withDefaultProps } from '../utils';
import './style/uploader.styl';

const defaultProps = {
  accept: 'imgage/*',
  resultType: 'dataUrl',
  maxSize: Number.MAX_VALUE,
  disabled: false
};

type DefaultProps = Readonly<typeof defaultProps>;

type UploaderProps = {
  beforeRead?: (files: FileList) => void;
  afterRead?: (files: FileList) => void;
  oversize?: (files: FileList) => void;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
} & DefaultProps;

const Uploader = withDefaultProps(
  defaultProps,
  class extends React.Component<UploaderProps, any> {
    private inputRef: React.RefObject<any> = React.createRef();
    private onChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
      const files = e.target.files;
      const { disabled, beforeRead } = this.props;
      if (disabled || !(files || '').length) {
        return;
      }

      const filelists = (files || []).length === 1 ? (files|| '')[0] : [].slice.call(files, 0);
      if (!files || beforeRead && !beforeRead(files)) {
        return;
      }
      if (Array.isArray(filelists)) {
        Promise.all(filelists.map(this.readFile)).then(contents => {
          let oversize = false;
          const payload:any = filelists.map((file:File, index:number) => {
            if (file.size > this.props.maxSize) {
              oversize = true;
            }

            return {
              file: files[index],
              content: contents[index]
            };
          });

          this.onAfterRead(payload, oversize);
        });
      } else {
        this.readFile(filelists).then((content:any) => {
          this.onAfterRead(
            { file: filelists, content },
            filelists.size > this.props.maxSize
          )
        })
      }
    }
    private readFile = (file: File) => {
      return new Promise(resolve => {
        const reader:FileReader = new FileReader();

        reader.onload = (ev:any) => {
          resolve(ev.target ? ev.target.result : '');
        };
        if (this.props.resultType === 'dataUrl') {
          reader.readAsDataURL(file);
        } else if (this.props.resultType === 'text') {
          reader.readAsText(file);
        }
      });
    }
    private onAfterRead = (files: any, oversize: boolean) => {
      if (oversize) {
        this.props.oversize ? this.props.oversize(files) : undefined;
      } else {
        this.props.afterRead && this.props.afterRead(files);
        this.inputRef && (this.inputRef.current.value = '');
      }
    }
    public render() {
      const {
        disabled,
        accept,
        resultType,
        maxSize,
        children,
        style,
        className,
        ...resProps
      } = this.props;
      const uploaderCls = classnames('afo-uploader', className);
      return (
        <div className={uploaderCls}>
          {
            children
          }
          <input
            className="afo-uploader__input"
            disabled={disabled}
            accept={accept}
            onChange={(e) => this.onChange(e)}
            ref={this.inputRef}
            type="file"
            {...resProps}
          />
        </div>
      )
    }
  }
)

export default Uploader;
