/**
 * 设计：
 * 1. 通用非业务基础包（@fundam/shared）：包含通用常量、通用方法、通用类等
 * 2. 通用动作封装（@fundam/action）：包含弹窗、请求回显数据等
 * 3. 搭建系统（@fundam/dashboard）：搭建器
 * 4. 编辑器 - PC网页（@fundam/editor-pc-web-react）：控制编辑器的渲染区
 * 5. 编辑器 - 手机网页（@fundam/editor-mobile-web-react）：控制编辑器的渲染区
 * 6. 编辑器 - 主体（@fundam/editor）：用于渲染整个编辑器，包含拖拽、左右控制区、deeplink/命令行跳转编辑器、区分各个环境、接口校验配置、表单项校验配置、一键生成服务端校验规则等
 * 7. react通用逻辑包（@fundam/react）：包含react相关的通用逻辑
 * 8. 内置ui - antd（@fundam/antd）：包含antd所有组件，并支持搭建
 *
 * 原则
 * 1. 组件驱动：这里的"组件"可以是一个完整的应用程序、页面、UI集合、后端服务、action/action集合等
 * 2. 核心原则：无论组件大小，都需要保持独立维护，所有组件升级迭代时必须向后兼容，若出现不能兼容的情况，则不时候在原组件上进行迭代，更应该新起一个组件进行迭代
 *
 * 后续
 * 1. 通用业务基础包（------）：包含业务常量、业务方法、业务类等
 * 2. 编辑器 - 手机应用（@fundam/editor-mobile-app-react-native）
 * 3. 编辑器 - 小程序（@fundam/editor-mobile-mini-program）
 * 4. 校验（跨环境） - validator（@fundam/validator）：包含校验 - ajv？？
 */

// 配置跟着页面走，保证页面的schema拷贝到另一个项目也可以正常运行。antd后台 - 列表页面示例：
const schema = {
  config: {
    api: [
      {
        id: 'API_SB8eY9',
        method: 'get',
        name: '获取用户列表',
        path: '/user/list',
      },
      {
        id: 'API_YfaDhT',
        method: 'put',
        name: '修改用户信息',
        path: '/user/update',
        // TODO 可选配置（一期不支持，本schema非最终确定状态），参考：https://ajv.js.org/json-type-definition.html
        params: {
          userId: {
            type: 'number',
            required: true,
            min: 1,
            message: '用户ID不合法'
          },
          username: {
            type: 'string',
            required: true,
            pattern: '^[a-zA-Z0-9]{3,30}$',
            message: '用户名必须由字母、数字组成'
          },
          nickname: {
            type: 'string',
            required: true,
            minLength: 2,
            maxLength: 16
          },
          phoneNumber: {
            type: 'string',
            required: true, // 可选
            validator: 'phone', // 验证器，参考formily2 x-validator
            message: '手机号不正确' // 可以不传
          },
          books: {
            type: 'array',
            maxLength: 10,
            items: {
              name: {
                type: 'string',
                minLength: 1,
                maxLength: 32
              },
              price: {
                type: 'number',
                precision: 2,
                min: 1,
                max: 9999
              }
            }
          }
        }
      }
    ]
  },
  root: {
    component: 'Page',
    componentProps: {
      style: {
        backgroundColor: '#ccc'
      }
    },
    properties: {
      f1izaj9xb40: {
        id: 'f1izaj9xb40',
        component: 'Card',
        componentProps: {
          title: '用户列表',
          bordered: false,
        },
        properties: {
          f1izaj9xb41: {
            id: 'f1izaj9xb41',
            component: 'Form',
            componentProps: {
              layout: 'horizontal',
              minColumns: 4,
              maxColumns: 4,
              columnGap: 12,
              rowGap: 0,
              colWrap: true,
            },
            // 三种配置方式
            // 配置触发器（直接选取触发器），串行
            onMount: [
              {
                // observe: [], // TODO 响应式监听的对象？
                action: 'LOAD_QUERY',
              }
            ],
            // 配置代码（表单生成、或者打开webstorm等手撸）
            // onMount: async function () {
            //   // 全局变量、常量使用示例
            //   this.values = { ...fundam.page.query }
            // },
            properties: {
              f1izaj9xb42: {
                id: 'f1izaj9xb42',
                key: 'name',
                type: 'string',
                component: 'Input',
                componentProps: {
                  placeholder: '请输入'
                },
                decorator: 'FormItem',
                decoratorProps: {
                  label: '名称'
                }
              },
              f1izaj9xb43: {
                id: 'f1izaj9xb43',
                key: ['createTimeStart', 'createTimeEnd'],
                component: 'DateRangePicker',
                componentProps: {
                  // TODO
                  startTime: '00:00:00', // 时间选择器
                  endTime: '23:59:59' // => showTime.defaultValue = [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]
                },
                decorator: 'FormItem',
                decoratorProps: {
                  label: '创建时间'
                }
              }
            }
          }
        }
      }
    }
  }
}
