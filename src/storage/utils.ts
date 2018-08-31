import fse from "fs-extra"

export let OffsetBased = {
    async write(
        filepath: string, 
        offset: number, 
        data: string
    ){
        const fd = await fse.open(filepath, 'r')
    
        const buffer = new Buffer(data)
        await fse.write(fd, buffer, 0, buffer.length, offset)
        return offset + buffer.length
    },

    async read(
        filepath: string, 
        offset: number, 
        length: number | null = null
    ){
        const fd = await fse.open(filepath, 'r')
    
        if (length === null){
            const s = await fse.stat(filepath)
            length = s.size - offset
        }
    
        const buffer = new Buffer(length)
        await fse.read(fd, buffer, 0, length, offset)
        return buffer
    }
}

export function joinBuffer(buffer_list: Buffer[], total_n = -1){
    if (total_n === -1){
        total_n = 0
        for (const buffer of buffer_list){
            total_n += buffer.length
        }
    }

    const ret_buffer = new Buffer(total_n)
    let start = 0
    for (const buffer of buffer_list){
        buffer.copy(ret_buffer, start)
        start += buffer.length
    }

    return ret_buffer
}

export async function last(
    filepath: string,
    last_n_line = 1,
    try_max_size = 1000
){
    const exists = await fse.pathExists(filepath)
    if (!exists) return ""

    const fd = await fse.open(filepath, 'r')

    const stat = await fse.stat(filepath)
    const size = stat.size

    const buffer_list = [] as Buffer[]

    let offset_end = size
    while (true){
        let offset_start = offset_end - try_max_size
        if (offset_start < 0) offset_start = 0
        const read_size = offset_end - offset_start

        const b = new Buffer(try_max_size)
        await fse.read(fd, b, 0, read_size, offset_start)

        let last_cr = b.length
        while (true) {
            last_cr = b.lastIndexOf('\n', last_cr-1)
            if (last_cr > -1){
                last_n_line --
                if (last_n_line == 0) {
                    buffer_list.push(b.slice(last_cr + 1))
                    return joinBuffer(buffer_list.reverse())
                }
                // corner case: '\n'
                if (last_cr > 0) {
                    continue
                }
            }
            buffer_list.push(b)
            break
        }

        offset_end = offset_start
        if (offset_end === 0) {
            return joinBuffer(buffer_list.reverse())
        }
    }
}