import * as React from 'react'
import * as typings from './editor-attribute-border.type'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'
import { Button, ButtonGroup } from '../../../../../web-common/button/index'
import { Number } from '../../../../../web-common/number/index'
import Color from '../../../components/color/color.component'
import { autoBindMethod } from '../../../../../common/auto-bind/index'

import './editor-attribute-border.scss'

@EditorManager.observer(['ViewportStore', 'ViewportAction', 'ApplicationStore', 'ApplicationAction'])
export default class EditorAttributeBorder extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'editorAttributeBorder'

    private colorChangeStatus = 'finish'
    private colorHasChange = false

    /**
     * 获取统一的边框弧度
     */
    getCommonBorderRadius() {
        // 计算统一圆角弯度
        let borderRadius = 0

        if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopLeftRadius !== null) {
            borderRadius = this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopLeftRadius
        }
        if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopRightRadius !== null) {
            borderRadius = this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopRightRadius
        }
        if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomRightRadius !== null) {
            borderRadius = this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomRightRadius
        }
        if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomLeftRadius !== null) {
            borderRadius = this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomLeftRadius
        }
        return borderRadius
    }

    /**
     * 统一边框弧度变化
     */
    handleCommonBorderRadiusChange(value: string) {
        if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopLeftRadius !== null || this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopRightRadius !== null || this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomRightRadius !== null || this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomLeftRadius !== null) {
            // todo this.props.ViewportStore.prepareWriteHistory()
            if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopLeftRadius !== null) {
                this.props.ViewportAction.updateCurrentEditComponentProps('style.borderTopLeftRadius', parseFloat(value))
            }
            if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopRightRadius !== null) {
                this.props.ViewportAction.updateCurrentEditComponentProps('style.borderTopRightRadius', parseFloat(value))
            }
            if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomRightRadius !== null) {
                this.props.ViewportAction.updateCurrentEditComponentProps('style.borderBottomRightRadius', parseFloat(value))
            }
            if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomLeftRadius !== null) {
                this.props.ViewportAction.updateCurrentEditComponentProps('style.borderBottomLeftRadius', parseFloat(value))
            }
            // todo this.props.ViewportStore.writeHistory()
        }
    }

    handleRadiusClick(position: string) {
        switch (position) {
            case 'topLeft':
                if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopLeftRadius === null) {
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderTopLeftRadius', this.getCommonBorderRadius())
                } else {
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderTopLeftRadius', null)
                }
                break
            case 'topRight':
                if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopRightRadius === null) {
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderTopRightRadius', this.getCommonBorderRadius())
                } else {
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderTopRightRadius', null)
                }
                break
            case 'bottomRight':
                if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomRightRadius === null) {
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderBottomRightRadius', this.getCommonBorderRadius())
                } else {
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderBottomRightRadius', null)
                }
                break
            case 'bottomLeft':
                if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomLeftRadius === null) {
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderBottomLeftRadius', this.getCommonBorderRadius())
                } else {
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderBottomLeftRadius', null)
                }
                break
        }
    }

    getCommonBorder() {
        let style: string
        let width: number
        let color: string

        if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderLeftWidth !== null) {
            width = this.props.ViewportStore.currentEditComponentInfo.props.style.borderLeftWidth
            style = this.props.ViewportStore.currentEditComponentInfo.props.style.borderLeftStyle
            color = this.props.ViewportStore.currentEditComponentInfo.props.style.borderLeftColor
        }
        if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopWidth !== null) {
            width = this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopWidth
            style = this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopStyle
            color = this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopColor
        }
        if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderRightWidth !== null) {
            width = this.props.ViewportStore.currentEditComponentInfo.props.style.borderRightWidth
            style = this.props.ViewportStore.currentEditComponentInfo.props.style.borderRightStyle
            color = this.props.ViewportStore.currentEditComponentInfo.props.style.borderRightColor
        }
        if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomWidth !== null) {
            width = this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomWidth
            style = this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomStyle
            color = this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomColor
        }

        if (this.props.ApplicationStore.editorProps.isReactNative) {
            color = this.props.ViewportStore.currentEditComponentInfo.props.style.borderColor
        }

        return { style, width, color }
    }

    handleBorderClick(position: string) {
        const commonBorder = this.getCommonBorder()

        switch (position) {
            case 'left':
                if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderLeftWidth === null) {
                    // todo this.props.ViewportStore.prepareWriteHistory()
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderLeftWidth', commonBorder.width)
                    if (this.props.ApplicationStore.editorProps.isReactNative) {
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderColor', commonBorder.color)
                    } else {
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderLeftColor', commonBorder.color)
                    }
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderLeftStyle', commonBorder.style)
                    // todo this.props.ViewportStore.writeHistory()
                } else {
                    // todo this.props.ViewportStore.prepareWriteHistory()
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderLeftWidth', null)
                    if (this.props.ApplicationStore.editorProps.isReactNative) {
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderColor', null)
                    } else {
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderLeftColor', null)
                    }
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderLeftStyle', null)
                    // todo this.props.ViewportStore.writeHistory()
                }
                break
            case 'top':
                if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopWidth === null) {
                    // todo this.props.ViewportStore.prepareWriteHistory()
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderTopWidth', commonBorder.width)
                    if (this.props.ApplicationStore.editorProps.isReactNative) {
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderColor', commonBorder.color)
                    } else {
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderTopColor', commonBorder.color)
                    }
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderTopStyle', commonBorder.style)
                    // todo this.props.ViewportStore.writeHistory()
                } else {
                    // todo this.props.ViewportStore.prepareWriteHistory()
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderTopWidth', null)
                    if (this.props.ApplicationStore.editorProps.isReactNative) {
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderColor', null)
                    } else {
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderTopColor', null)
                    }
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderTopStyle', null)
                    // todo this.props.ViewportStore.writeHistory()
                }
                break
            case 'right':
                if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderRightWidth === null) {
                    // todo this.props.ViewportStore.prepareWriteHistory()
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderRightWidth', commonBorder.width)
                    if (this.props.ApplicationStore.editorProps.isReactNative) {
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderColor', commonBorder.color)
                    } else {
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderRightColor', commonBorder.color)
                    }
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderRightStyle', commonBorder.style)
                    // todo this.props.ViewportStore.writeHistory()
                } else {
                    // todo this.props.ViewportStore.prepareWriteHistory()
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderRightWidth', null)
                    if (this.props.ApplicationStore.editorProps.isReactNative) {
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderColor', null)
                    } else {
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderRightColor', null)
                    }
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderRightStyle', null)
                    // todo this.props.ViewportStore.writeHistory()
                }
                break
            case 'bottom':
                if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomWidth === null) {
                    // todo this.props.ViewportStore.prepareWriteHistory()
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderBottomWidth', commonBorder.width)
                    if (this.props.ApplicationStore.editorProps.isReactNative) {
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderColor', commonBorder.color)
                    } else {
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderBottomColor', commonBorder.color)
                    }
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderBottomStyle', commonBorder.style)
                    // todo this.props.ViewportStore.writeHistory()
                } else {
                    // todo this.props.ViewportStore.prepareWriteHistory()
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderBottomWidth', null)
                    if (this.props.ApplicationStore.editorProps.isReactNative) {
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderColor', null)
                    } else {
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderBottomColor', null)
                    }
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderBottomStyle', null)
                    // todo this.props.ViewportStore.writeHistory()
                }
                break
        }
    }

    handleBorderStyleChange(style: string) {
        if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopWidth !== null || this.props.ViewportStore.currentEditComponentInfo.props.style.borderLeftWidth !== null || this.props.ViewportStore.currentEditComponentInfo.props.style.borderRightWidth !== null || this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomWidth !== null) {
            // todo this.props.ViewportStore.prepareWriteHistory()
            if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderLeftWidth !== null) {
                this.props.ViewportAction.updateCurrentEditComponentProps('style.borderLeftStyle', style)
            }
            if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopWidth !== null) {
                this.props.ViewportAction.updateCurrentEditComponentProps('style.borderTopStyle', style)
            }
            if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderRightWidth !== null) {
                this.props.ViewportAction.updateCurrentEditComponentProps('style.borderRightStyle', style)
            }
            if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomWidth !== null) {
                this.props.ViewportAction.updateCurrentEditComponentProps('style.borderBottomStyle', style)
            }
            // todo this.props.ViewportStore.writeHistory()
        }
    }

    handleBorderColorChange(color: any) {
        const rgba = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`

        if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopWidth !== null || this.props.ViewportStore.currentEditComponentInfo.props.style.borderLeftWidth !== null || this.props.ViewportStore.currentEditComponentInfo.props.style.borderRightWidth !== null || this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomWidth !== null) {
            this.colorHasChange = true
            if (this.colorChangeStatus === 'finish') {
                this.colorChangeStatus = 'start'
                // todo this.props.ViewportStore.prepareWriteHistory()
            }

            if (this.props.ApplicationStore.editorProps.isReactNative) {
                this.props.ViewportAction.updateCurrentEditComponentProps('style.borderColor', rgba)
            } else {
                if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderLeftWidth !== null) {
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderLeftColor', rgba)
                }
                if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopWidth !== null) {
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderTopColor', rgba)
                }
                if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderRightWidth !== null) {
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderRightColor', rgba)
                }
                if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomWidth !== null) {
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderBottomColor', rgba)
                }
            }

        } else {
            this.colorHasChange = false
        }
    }

    handleBorderColorChangeComplete() {
        this.colorChangeStatus = 'finish'
        if (this.colorHasChange) {
            // todo this.props.ViewportStore.writeHistory()
        }
    }

    handleBorderWidthChange(value: string) {
        if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopWidth !== null || this.props.ViewportStore.currentEditComponentInfo.props.style.borderLeftWidth !== null || this.props.ViewportStore.currentEditComponentInfo.props.style.borderRightWidth !== null || this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomWidth !== null) {
            // todo this.props.ViewportStore.prepareWriteHistory()
            if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderLeftWidth !== null) {
                this.props.ViewportAction.updateCurrentEditComponentProps('style.borderLeftWidth', parseFloat(value))
            }
            if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopWidth !== null) {
                this.props.ViewportAction.updateCurrentEditComponentProps('style.borderTopWidth', parseFloat(value))
            }
            if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderRightWidth !== null) {
                this.props.ViewportAction.updateCurrentEditComponentProps('style.borderRightWidth', parseFloat(value))
            }
            if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomWidth !== null) {
                this.props.ViewportAction.updateCurrentEditComponentProps('style.borderBottomWidth', parseFloat(value))
            }
            // todo this.props.ViewportStore.writeHistory()
        }
    }

    render() {
        const borderRadius = this.getCommonBorderRadius()
        const commonBorder = this.getCommonBorder()

        return (
            <div className="_namespace">
                <div className="border-container">
                    <div className="left-container">
                        <Button className="border-left"
                            active={this.props.ViewportStore.currentEditComponentInfo.props.style.borderLeftWidth !== null}
                            onClick={this.handleBorderClick.bind(this, 'left')}>
                            <svg className="svg-icon rotate-270">
                                <use xlinkHref="#border" />
                            </svg>
                        </Button>
                        <Button className="border-top"
                            active={this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopWidth !== null}
                            onClick={this.handleBorderClick.bind(this, 'top')}>
                            <svg className="svg-icon">
                                <use xlinkHref="#border" />
                            </svg>
                        </Button>
                        <Button className="border-right"
                            active={this.props.ViewportStore.currentEditComponentInfo.props.style.borderRightWidth !== null}
                            onClick={this.handleBorderClick.bind(this, 'right')}>
                            <svg className="svg-icon rotate-90">
                                <use xlinkHref="#border" />
                            </svg>
                        </Button>
                        <Button className="border-bottom"
                            active={this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomWidth !== null}
                            onClick={this.handleBorderClick.bind(this, 'bottom')}>
                            <svg className="svg-icon rotate-180">
                                <use xlinkHref="#border" />
                            </svg>
                        </Button>
                    </div>

                    <div className="right-container">
                        <div className="row">
                            <div className="icon-title">Style</div>
                            <ButtonGroup>
                                {this.props.ApplicationStore.editorProps.isReactNative ?
                                    <Button active={commonBorder.style === null}
                                        onClick={this.handleBorderStyleChange.bind(this, null)}>x</Button> :
                                    <Button active={commonBorder.style === 'none'}
                                        onClick={this.handleBorderStyleChange.bind(this, 'none')}>x</Button>
                                }
                                <Button active={commonBorder.style === 'solid'}
                                    onClick={this.handleBorderStyleChange.bind(this, 'solid')}>
                                    <svg className="svg-icon rotate-180">
                                        <use xlinkHref="#solid" />
                                    </svg>
                                </Button>
                                <Button active={commonBorder.style === 'dashed'}
                                    onClick={this.handleBorderStyleChange.bind(this, 'dashed')}>
                                    <svg className="svg-icon rotate-180">
                                        <use xlinkHref="#dashed" />
                                    </svg>
                                </Button>
                                <Button active={commonBorder.style === 'dotted'}
                                    onClick={this.handleBorderStyleChange.bind(this, 'dotted')}>
                                    <svg className="svg-icon rotate-180">
                                        <use xlinkHref="#dotted" />
                                    </svg>
                                </Button>
                            </ButtonGroup>
                        </div>
                        <div className="row">
                            <div className="icon-title">Width</div>
                            <Number label=""
                                value={commonBorder.width ? commonBorder.width.toString() : '0'}
                                onChange={this.handleBorderWidthChange.bind(this)} />
                        </div>
                        <div className="row">
                            <div className="icon-title">Color</div>
                            <Color onChange={this.handleBorderColorChange.bind(this)}
                                onChangeComplete={this.handleBorderColorChangeComplete.bind(this)}
                                color={commonBorder.color || 'white'} />
                        </div>
                    </div>
                </div>

                <div className="radius-container">
                    <div className="left-container">
                        <div className="radius-content">
                            <Button className="radius-left"
                                active={this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopLeftRadius !== null}
                                onClick={this.handleRadiusClick.bind(this, 'topLeft')}>
                                <svg className="svg-icon">
                                    <use xlinkHref="#border-radius" />
                                </svg>
                            </Button>
                            <Button className="radius-top"
                                active={this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopRightRadius !== null}
                                onClick={this.handleRadiusClick.bind(this, 'topRight')}>
                                <svg className="svg-icon rotate-90">
                                    <use xlinkHref="#border-radius" />
                                </svg>
                            </Button>
                            <Button className="radius-right"
                                active={this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomRightRadius !== null}
                                onClick={this.handleRadiusClick.bind(this, 'bottomRight')}>
                                <svg className="svg-icon rotate-180">
                                    <use xlinkHref="#border-radius" />
                                </svg>
                            </Button>
                            <Button className="radius-bottom"
                                active={this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomLeftRadius !== null}
                                onClick={this.handleRadiusClick.bind(this, 'bottomLeft')}>
                                <svg className="svg-icon rotate-270">
                                    <use xlinkHref="#border-radius" />
                                </svg>
                            </Button>
                        </div>
                    </div>

                    <div className="right-container">
                        <div className="row">
                            <div className="icon-title">边距</div>
                            <Number label=""
                                min={0}
                                onChange={this.handleCommonBorderRadiusChange.bind(this)}
                                value={borderRadius ? borderRadius.toString() : '0'} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}