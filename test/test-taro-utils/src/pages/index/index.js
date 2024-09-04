import { View, Text } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import './index.scss';
export default function Index() {
    useLoad(() => {
        console.log('Page loaded.');
    });
    return (React.createElement(View, { className: 'index' },
        React.createElement(Text, null, "Hello world!")));
}
//# sourceMappingURL=index.js.map